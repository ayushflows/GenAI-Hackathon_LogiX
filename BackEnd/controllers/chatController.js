const chat_main = require('../api/chat_langflow');

let chat_result = '';

module.exports.chat = async (req, res) => {
    try {
        const { chat } = req.body;
        let stringChat = JSON.stringify(chat);
        chat_result = await chat_main(stringChat);
        // res.send(chat_result.message.text);
        res.json({ message: chat_result.message.text });
    } catch (error) {
        console.error('Error during chat operation:', error);
        res.status(500).json({ error: 'Error during chat operation' });
    }

};

