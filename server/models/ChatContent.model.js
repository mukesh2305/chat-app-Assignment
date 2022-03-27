const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChatContentSchema = new Schema(
    {
        message: {
            type: String,
        },
        sender: {
            type: String,
            unique: true,
        },
        roomId: {
            type: String,
        },
        time: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

let ChatContent = mongoose.model("ChatContent", ChatContentSchema);
module.exports = ChatContent;
