const connection = require("../mongoose");

const secretSchema = new connection.Schema({
    content: String
});
const Secret = connection.model("Secret", secretSchema);

module.exports = Secret;