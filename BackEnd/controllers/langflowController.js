const main = require('../api/langflow');
const { DataAPIClient } = require('@datastax/astra-db-ts');
const client = new DataAPIClient(process.env.db);
const db = client.db('https://be853ae4-2ec8-4eb0-a184-265ee7d1e86c-us-east-2.apps.astra.datastax.com');

const user_data = {};

const langflow = async (req, res) => {
    try {
        const { socialAccount, user, postType } = req.body;
        const cursor = await db.collection('final_database_1000').find(
            {
                platform: socialAccount,
                user: user,
                post_type: postType,
            },
            {
                projection: { _id: 0 },
            }
        );
        const Data_results = await cursor.toArray();
        const globalDataLang = JSON.stringify(Data_results);

        // Update `user_data` dynamically
        user_data.socialAccount = socialAccount;
        user_data.user = user;
        user_data.postType = postType;

        console.log(user_data)

        const result = await main(globalDataLang);

        const parsedResult = JSON.parse(result.message.text);
        res.json(parsedResult);
    } catch (error) {
        console.error('Error during query of filtering data from langflow or AstraDb:', error);
        res.status(500).json({ error: 'Error during query of filtering data langflow or AstraDb' });
    }
};

module.exports = {
    langflow,
    user_data, 
};
