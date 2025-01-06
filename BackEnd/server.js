require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { DataAPIClient } = require('@datastax/astra-db-ts');
const client = new DataAPIClient(process.env.db);
const db = client.db('https://be853ae4-2ec8-4eb0-a184-265ee7d1e86c-us-east-2.apps.astra.datastax.com');

const main = require('./langflow');

const allowedOrigins = ['http://localhost:5173', 'https://genai-hackathon.web.app'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps or Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let prompt = `You are provided with social media data of a particular user. Analyze the data and provide the analysis strictly in the following JSON format. Ensure all calculations adhere strictly to the provided formulas, handle edge cases, and ensure percentages do not exceed 100%. Use the listed country codes only where applicable.

Strictly follow this format:

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
",
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
    "morning": (average reach in weekday of morning , it must strictly numeric number) ,
      "afternoon":(average reach in weekday of afternoon , it must strictly numeric number) ,
      "evening": (average reach in weekday of evening,it must strictly numeric number),
      "night": (average reach in weekday of night, it must strictly numeric number)(
    },
    "weekend": {
      "morning":(average reach in weekend of morning, it must strictly numeric number),
      "afternoon":(average reach in weekend of afternoon, it must strictly numeric number ),
      "evening": (average reach in weekend of evening, it must strictly numeric number),
      "night":(average reach in weekend of night, it must strictly numeric number)
    }
  },
  "sentimental_analysis": ,
  "conversion_rate": ,
  "insights": [
    "insight1",
    "insight2",
    "insight3",
    "insight4",
    "insight5"
  ]
}

Key Calculation Notes:
1. **Gender Distribution**: Calculate percentages for male and female audience by dividing the count of each gender by the total audience and multiplying by 100.
2. **Audience Age**: Use the formula: Percentage = (Number of Users in Age Group / Total Users) × 100.
3. **Reach Time Stamp Graph**: Calculate the average reach for each time period (Morning,Afternoon,Evening,Night) using the formula: Average Reach (Time Period of specified field) = (Total Reach for specific time period) / (Number of posts in that time period).
4. **Sentimental Analysis**: Use the formula: (total_likes + total_comment + total_shares) / total_reach × 100. Ensure it is capped at 100%.
5. **Conversion Rate**: Calculate as: (reach / impressions) × 100, capped at 100%.
6. **Insights**: Generate key insights from the data based on trends, engagement, and performance.

Output strictly in JSON format with valid values derived from the data provided. Do not include any additional commentary or invalid values. Ensure all calculated values are correct.
`

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
