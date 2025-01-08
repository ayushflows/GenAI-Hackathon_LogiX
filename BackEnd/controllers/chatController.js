const chat_main = require('../api/chat_langflow');

module.exports.chat = async (req, res) => {
    try {

        if (!req.body || !req.body.chat) {
            res.status(400).json({ error: 'Invalid request: "chat" field is required' });
            return;
        }

        const { chat } = req.body;
        const stringChat = JSON.stringify(chat);
        let chat_result;

        try {
            chat_result = await chat_main(stringChat);
        } catch (innerError) {
            console.error('Error processing chat_main:', innerError);
            res.status(500).json({ error: 'Internal server error while processing chat' });
            return;
        }

        res.json({ message: chat_result });
    } catch (error) {
        console.error('Unexpected error during chat operation:', error);
        res.status(500).json({ error: 'Unexpected error during chat operation' });
    }
};
