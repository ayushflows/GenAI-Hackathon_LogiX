require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const { DataAPIClient } = require('@datastax/astra-db-ts');
const client = new DataAPIClient(process.env.db);
const db = client.db('https://be853ae4-2ec8-4eb0-a184-265ee7d1e86c-us-east-2.apps.astra.datastax.com');

const main = require('./langflow');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let prompt = `"This is the social media data of a particular user you have to analyze it and provide the social media analysis in this format.{


username:
platform:
Type:
likes:
comments:
shares:
reach: 
country Code: 
male Percentage:  
female Percentage:
audience Age:
- 18 - 24:
- 25 - 34:
- 35 - 44:
- 45 +  :

reach Time Stamp Graph:
weekday -
    morning:
afternoon:
evening:
night:
weekend -
    morning:
afternoon:
evening:
night: 
sentimental Analysis:   
conversion Rate:
insight1:
insight2:
insight3:
insight4:
insight5:
}`

app.post('/socialAccount', (req, res) => {
    const { socialAccount } = req.body;
    let fetchData = async () => {
        try {
            const results = await db
                .collection('final_dataset')
                .distinct('User', { platform: socialAccount }); // Use distinct to get unique users
            res.json({ data: results });
        } catch (error) {
            console.error('Error during query:', error);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    };
    fetchData();
});

// Declare a global variable
let globalDataResults = []; // Initialize as an empty array

app.post('/data', (req, res) => {
    const { socialAccount, User, postType } = req.body;
    console.log(socialAccount, User, postType);

    let fetchData = async () => {
        try {
            const cursor = await db
                .collection('final_dataset')
                .find(
                    {
                        platform: socialAccount,
                        User: User,
                        post_type: postType,
                    },
                    {
                        projection: { _id: 0 },
                    }
                );
            const Data_results = await cursor.toArray();

            // Update the global variable
            globalDataResults = Data_results;

            res.json({ data: Data_results });
        } catch (error) {
            console.error('Error during query:', error);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    };

    fetchData();
});


app.post("/fetchdata", async (req, res) => {
    try {
        
        globalDataLang = JSON.stringify(globalDataResults, null, 2); 
        const inputValue = `${globalDataLang}\n${prompt}`;
        const result = await main(inputValue);

        console.log("Analysis Result:", result);
        res.json(result);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
