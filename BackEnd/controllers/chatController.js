const { user_data } = require("../controllers/langflowController");
const chat_main = require('../api/chat_langflow');
const { DataAPIClient } = require('@datastax/astra-db-ts');
const client = new DataAPIClient(process.env.db);
const db = client.db('https://be853ae4-2ec8-4eb0-a184-265ee7d1e86c-us-east-2.apps.astra.datastax.com');

let chat_result = '';

module.exports.chat = async (req, res) => {
    try {
        const { chat } = req.body;

        console.log(user_data)
        console.log(user_data.socialAccount, user_data.user, user_data.postType);


        const cursor = await db.collection('final_database_1000').find(
            {
                platform: user_data.socialAccount,
                user: user_data.user,
                post_type: user_data.postType,
            },
            {
                projection: { _id: 0 },
            }
        );

        const Data_results = await cursor.toArray();

        let array = {
            data: Data_results,
            Question: chat,
        };

        const globalDataLang = JSON.stringify(array);
        chat_result = await chat_main(globalDataLang);
        const cleanedChatResult = chat_result.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        res.json({ message: cleanedChatResult });
    } catch (error) {
        console.error('Error during chat operation:', error);
        res.status(500).json({ error: 'Error during chat operation' });
    }
};
