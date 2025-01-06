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
  "country_code": "(here provide the code of the country which has the highest audience located in that region, strictly provide only one country code from following below list:     
  { name: "United States", code: "US" },
    { name: "Brazil", code: "BR" },
    { name: "Germany", code: "DE" },
    { name: "France", code: "FR" },
    { name: "Russia", code: "RU" },
    { name: "India", code: "IN" },
    { name: "China", code: "CN" },
    { name: "Japan", code: "JP" },
    { name: "United Kingdom", code: "GB" },
    { name: "Australia", code: "AU" },
    { name: "Canada", code: "CA" },
    { name: "Italy", code: "IT" },
    { name: "Spain", code: "ES" },
    { name: "Mexico", code: "MX" },
    { name: "South Korea", code: "KR" },
    { name: "Indonesia", code: "ID" },
    { name: "Turkey", code: "TR" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Nigeria", code: "NG" },
    { name: "Argentina", code: "AR" },
    { name: "Netherlands", code: "NL" },
    { name: "South Africa", code: "ZA" },
    { name: "Switzerland", code: "CH" },
    { name: "Sweden", code: "SE" },
    { name: "Poland", code: "PL" },
    { name: "Belgium", code: "BE" },
    { name: "Thailand", code: "TH" },
    { name: "Egypt", code: "EG" },
    { name: "Pakistan", code: "PK" },
    { name: "Malaysia", code: "MY" },
    { name: "Philippines", code: "PH" },
    { name: "Singapore", code: "SG" },
    { name: "Vietnam", code: "VN" },
    { name: "Denmark", code: "DK" },
    { name: "Finland", code: "FI" },
    { name: "Norway", code: "NO" },
    { name: "New Zealand", code: "NZ" },
    { name: "Ukraine", code: "UA" },
    { name: "Israel", code: "IL" },
    { name: "Ireland", code: "IE" },
    { name: "Austria", code: "AT" },
    { name: "Chile", code: "CL" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Portugal", code: "PT" },
    { name: "Hungary", code: "HU" },
    { name: "Romania", code: "RO" },
    { name: "Greece", code: "GR" },
    { name: "Hong Kong", code: "HK" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "Colombia", code: "CO" },
    { name: "Bulgaria", code: "BG" },
    { name: "Serbia", code: "RS" },
    { name: "Slovakia", code: "SK" },
    { name: "Croatia", code: "HR" },
    { name: "Lithuania", code: "LT" },
    { name: "Slovenia", code: "SI" },
    { name: "Latvia", code: "LV" },
    { name: "Estonia", code: "EE" },
    { name: "Iceland", code: "IS" },
    { name: "Luxembourg", code: "LU" },
    { name: "Malta", code: "MT" },
    { name: "Cyprus", code: "CY" }, do not provide any other country code except these, provide the top first country from this list),",
  "gender_distribution": {
    "male_percentage": ,
    "female_percentage": 
  },
  "audience_age": {
    "18-24": (percentage of audience in this age group),
    "25-34": (percentage of audience in this age group),,
    "35-44": (percentage of audience in this age group),,
    "45+": (percentage of audience in this age group),
  },
  "reach_time_stamp_graph": {
    "weekday": {
      "morning": (average no of reach in morning on weekdays),
      "afternoon": (average no of reach in afternoon on weekdays),
      "evening": (average no of reach in evening on weekdays),
      "night": (average no of reach in night on weekdays),
    },
    "weekend": {
      "morning": (average no of reach in morning on weekends),
      "afternoon": (average no of reach in afternoon on weekends),
      "evening": (average no of reach in evening on weekends),
      "night": (average no of reach in night on weekends),
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
