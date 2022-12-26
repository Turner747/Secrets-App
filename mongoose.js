const mongoose = require("mongoose");

// mongoose setup
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;