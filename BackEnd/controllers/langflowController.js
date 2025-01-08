const main = require('../api/langflow');
const chat_main = require('../api/chat_langflow');
const { DataAPIClient } = require('@datastax/astra-db-ts');
const client = new DataAPIClient(process.env.db);
const db = client.db('https://be853ae4-2ec8-4eb0-a184-265ee7d1e86c-us-east-2.apps.astra.datastax.com');

module.exports.langflow = async (req, res) => {
    try {
        if (!req.body || !req.body.socialAccount || !req.body.user || !req.body.postType) {
            res.status(400).json({ error: 'Invalid request: Required fields are missing' });
            return;
        }

        const { socialAccount, user, postType } = req.body;
        let cursor;
        try {
            cursor = await db.collection('final_database_1000').find(
                {
                    platform: socialAccount,
                    user: user,
                    post_type: postType,
                },
                {
                    projection: { _id: 0 },
                }
            );
        } catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).json({ error: 'Error querying the database' });
            return;
        }

        let Data_results;
        try {
            Data_results = await cursor.toArray();
        } catch (cursorError) {
            console.error('Error processing cursor:', cursorError);
            res.status(500).json({ error: 'Error processing database results' });
            return;
        }

        const globalDataLang = JSON.stringify(Data_results);

        try {
            await chat_main(globalDataLang);
        } catch (chatError) {
            console.error('Error in chat_main function:', chatError);
            res.status(500).json({ error: 'Error during chat processing' });
            return;
        }

        let result;
        try {
            result = await main(globalDataLang);
        } catch (mainError) {
            console.error('Error in main function:', mainError);
            res.status(500).json({ error: 'Error during langflow processing' });
            return;
        }

        let parsedResult;
        try {
            parsedResult = JSON.parse(result.message.text);
        } catch (parseError) {
            console.error('Error parsing result:', parseError);
            res.status(500).json({ error: 'Error parsing langflow response' });
            return;
        }

        res.json(parsedResult);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
};
