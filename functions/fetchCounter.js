{\rtf1\ansi\ansicpg936\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const fetch = require("node-fetch");\
\
exports.handler = async (event) => \{\
    const apiKey = "patZpbE4AHddeGWX4.7dfb5a565041d03c1f642cc78bf4c1aaf22e88106f05753de0402923f7f6572f";\
    const baseId = "app4WJBf8lj64psvp";\
    const tableName = "counter";\
    const recordId = "recmsXG7ybfuXFu8H";\
    const url = `https://api.airtable.com/v0/$\{baseId\}/$\{tableName\}/$\{recordId\}`;\
\
    if (event.httpMethod === "GET") \{\
        try \{\
            const response = await fetch(url, \{\
                headers: \{ Authorization: `Bearer $\{apiKey\}` \}\
            \});\
            const data = await response.json();\
            return \{\
                statusCode: 200,\
                body: JSON.stringify(data)\
            \};\
        \} catch (error) \{\
            console.error("Error fetching data from Airtable:", error);\
            return \{\
                statusCode: 500,\
                body: JSON.stringify(\{ error: "Failed to fetch data" \})\
            \};\
        \}\
    \}\
\
    if (event.httpMethod === "PATCH") \{\
        const \{ count \} = JSON.parse(event.body);\
        try \{\
            const response = await fetch(url, \{\
                method: "PATCH",\
                headers: \{\
                    Authorization: `Bearer $\{apiKey\}`,\
                    "Content-Type": "application/json"\
                \},\
                body: JSON.stringify(\{\
                    fields: \{ count \}\
                \})\
            \});\
            const data = await response.json();\
            return \{\
                statusCode: 200,\
                body: JSON.stringify(data)\
            \};\
        \} catch (error) \{\
            console.error("Error updating data in Airtable:", error);\
            return \{\
                statusCode: 500,\
                body: JSON.stringify(\{ error: "Failed to update data" \})\
            \};\
        \}\
    \}\
\
    return \{ statusCode: 405, body: "Method Not Allowed" \};\
\};\
}