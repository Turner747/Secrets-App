const connection = require("../mongoose");
const Secret = require("./secret");
const encrypt = require("mongoose-encryption");

const userSchema = new connection.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    secrets: [Secret.schema]
});

userSchema.plugin(encrypt, {
    secret: process.env.SECRET,
    encryptedFields: ["password"]
});

const User = connection.model("User", userSchema);

module.exports = User;