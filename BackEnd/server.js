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
                        User: user,
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
    
        globalDataLang = JSON.stringify(globalDataResults);
        const result = await main(globalDataLang);
        console.log(result.message.text)
        const parsedResult = JSON.parse(result.message.text); 
        res.json(parsedResult);
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
        const globalDataLang = JSON.stringify(Data_results);
        const result = await main(globalDataLang);
        console.log(result.message.text)
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
