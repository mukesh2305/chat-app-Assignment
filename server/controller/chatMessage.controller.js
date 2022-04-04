const ChatContent = require("../models/ChatContent.model.js");
// mongodb+srv://mukesh:muk%4023599@cluster0.sqawy.mongodb.net/test?authSource=admin&replicaSet=atlas-af8och-shard-0&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=true
exports.getAllChatMessages = async (req, res) => {
    try {
        let ChatMessages = await ChatContent.find({});
        res.status(200).json({
            success: true,
            ChatMessages
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
};

exports.updateChatMessage = async (req, res) => {
    try {
        let chat = await ChatContent.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat Message not found"
            });
        }
        let ChatMessage = await ChatContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            ChatMessage
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

exports.deleteChatMessage = async (req, res) => {
    console.log(req.params.id);
    try {
        let chat = await ChatContent.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat Message not found"
            });
        }
        await chat.remove();
        res.status(200).json({
            success: true,
            message: "Chat Deleted successfully",
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

