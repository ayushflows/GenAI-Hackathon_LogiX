const chat_main = require('../api/chat_langflow');

let chat_result = '';

module.exports.chat = async (req, res) => {
    try {
        const { chat } = req.body;
        let stringChat = JSON.stringify(chat);
        let chat_result = await chat_main(stringChat);
        let sanitized_result = chat_result.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
        res.json({ message: sanitized_result });
    } catch (error) {
        console.error('Error during chat operation:', error);
        res.status(500).json({ error: 'Error during chat operation' });
    }
};
