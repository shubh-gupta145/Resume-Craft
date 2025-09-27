const mongoose = require("mongoose");
async function dbconnect() {
    await mongoose.connect("mongodb://localhost:27017/resumeCraft");
    console.log("database connected");
}
module.exports=dbconnect;