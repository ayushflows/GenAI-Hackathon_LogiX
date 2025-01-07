const { DataAPIClient } = require('@datastax/astra-db-ts');
const client = new DataAPIClient(process.env.db);
const db = client.db('https://be853ae4-2ec8-4eb0-a184-265ee7d1e86c-us-east-2.apps.astra.datastax.com');
const main = require('../api/langflow');
let globalDataResults = [];

module.exports.astraDb_socialAccount = async (req, res) => {
    const { socialAccount } = req.body;
    let fetchData = async () => {
        try {
            const results = await db
                .collection('final_dataset')
                .distinct('User', { platform: socialAccount });
            res.json({ data: results });
        } catch (error) {
            console.error('Error during query of filtering unique social media accounts:', error);
            res.status(500).json({ error: 'Error during query of filtering unique social media accounts' });
        }
    };
    fetchData();
};

module.exports.astraDb_data = async (req, res) => {
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
            console.error('Error during query of filtering data of particular user:', error);
            res.status(500).json({ error: 'Error during query of filtering data of particular user' });
        }
    };

    fetchData();
};

module.exports.astraDb_fetchdata = async (req, res) => {
    try {
        globalDataLang = JSON.stringify(globalDataResults);
        const result = await main(globalDataLang);
        console.log(result.message.text)
        const parsedResult = JSON.parse(result.message.text);
        res.json(parsedResult);
    } catch (error) {
        console.error('Error during query of filtering data from langflow or parsing:', error);
        res.status(500).json({ error: 'Error during query of filtering data langflow or parsing' });
    }
    
};