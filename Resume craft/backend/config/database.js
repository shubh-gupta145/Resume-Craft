const mongoose = require("mongoose");
async function dbconnect() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
}
module.exports=dbconnect;