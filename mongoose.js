const mongoose = require("mongoose");

// mongoose setup

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Connected to MongoDB");
});

module.exports = mongoose;