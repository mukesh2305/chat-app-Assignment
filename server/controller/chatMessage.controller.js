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

    // res.setHeader("Content-Type", "application/json");
    // res.statusCode = 200;
    // await ChatContent.then((db) => {
    //     ChatCon.find({}).then((chat) => {
    //         res.json(chat);
    //     });
    // });