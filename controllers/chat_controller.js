const { Chat } = require("../models/db_schema")

async function getChatHistory(req, res) {
    try {
        const messages = await Chat.find({jalsahId: req.params.jalsahId}).limit(50).sort({ timestamp: 1 }).exec();
        res.json(messages);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function saveChatMessage(msg, io){
    try {
        const chatMessage = new Chat({
            jalsahId: msg.jalsahId,
            user: msg.user, 
            message: msg.message,
        });
        await chatMessage.save();
        io.emit('chat message', chatMessage);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { getChatHistory, saveChatMessage }