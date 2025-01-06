require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { DataAPIClient } = require('@datastax/astra-db-ts');
const client = new DataAPIClient(process.env.db);
const db = client.db('https://be853ae4-2ec8-4eb0-a184-265ee7d1e86c-us-east-2.apps.astra.datastax.com');

const main = require('./langflow');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let prompt = `You are provided with the social media data of a particular user. Analyze the data and provide the analysis strictly in the following JSON format, Do not write comments and thin irrelevent or extra , just provide the vlaues of filed given, strictly:

{
  "username": "",
  "platform": "",
  "type": "",
  "likes": ,
  "comments": ,
  "shares": ,
  "reach": ,
  "country_code": "",
  "gender_distribution": {
    "male_percentage": ,
    "female_percentage": 
  },
  "audience_age": {
    "18-24": ,
    "25-34": ,
    "35-44": ,
    "45+": 
  },
  "reach_time_stamp_graph": {
    "weekday": {
      "morning": ,
      "afternoon": ,
      "evening": ,
      "night": 
    },
    "weekend": {
      "morning": ,
      "afternoon": ,
      "evening": ,
      "night": 
    }
  },
    "Sentimental Analysis" : (likes+reach+shares/totalreach, convert this in percentage), 
  "conversion_rate": (reach/impression, convert this in percentage),
  "insights": [
    "insight1",
    "insight2",
    "insight3",
    "insight4",
    "insight5"
  ]
}`

let globalDataResults = [];

app.get("/", (req, res) => {
    res.send("hello word");
})



app.post('/socialAccount', (req, res) => {
    const { socialAccount } = req.body;
    let fetchData = async () => {
        try {
            const results = await db
                .collection('final_dataset')
                .distinct('User', { platform: socialAccount });
            res.json({ data: results });
        } catch (error) {
            console.error('Error during query:', error);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    };
    fetchData();
});


app.post('/data', (req, res) => {
    const { socialAccount, user, postType } = req.body;
    console.log(socialAccount, user, postType);

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
        const parsedResult = JSON.parse(result.message.text);
        res.json(parsedResult);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});


app.post('/dataAnalysis', async (req, res) => {
    const { socialAccount, user, postType } = req.body;

    try {
        const cursor = await db.collection('final_dataset').find(
            {
                platform: socialAccount,
                User: user,
                post_type: postType,
            },
            {
                projection: { _id: 0 },
            }
        );
        const Data_results = await cursor.toArray();
        globalDataResults = Data_results;
        const globalDataLang = JSON.stringify(Data_results, null, 2);
        const inputValue = `${globalDataLang}\n${prompt}`;
        const result = await main(inputValue);
        const parsedResult = JSON.parse(result.message.text);
        res.json(parsedResult);
    } catch (error) {
        console.error('Error during data analysis:', error.message);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
