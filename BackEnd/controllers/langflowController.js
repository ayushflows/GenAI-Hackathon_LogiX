const main = require('../api/langflow');
const chat_main = require('../api/chat_langflow');
const { DataAPIClient } = require('@datastax/astra-db-ts');
const client = new DataAPIClient(process.env.db);
const db = client.db('https://be853ae4-2ec8-4eb0-a184-265ee7d1e86c-us-east-2.apps.astra.datastax.com');


module.exports.langflow = async (req, res) => {
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

        await chat_main(globalDataLang);

        const result = await main(globalDataLang);
        let string_chat = JSON.stringify(result);

        await chat_main(string_chat);
        
        const parsedResult = JSON.parse(result.message.text);
        res.json(parsedResult);
    } catch (error) {
        console.error('Error during query of filtering data from langflow or AstraDb:', error);
        res.status(500).json({ error: 'Error during query of filtering data langflow or AstraDb' });
    }
    
};

