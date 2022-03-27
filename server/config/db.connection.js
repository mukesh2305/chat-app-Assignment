const mongoose = require("mongoose");
// DB_URI = "mongodb://localhost:27017/Todo"

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then((data) => {
            console.log(
                `MongoDB Connected connected with server ${data.connection.host}`
            );
        })
        .catch((err) => {
            console.log("message:", err.message);
        });

};

module.exports = connectDatabase;
