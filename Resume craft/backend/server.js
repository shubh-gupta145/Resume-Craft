const express= require("express");
const cors=require("cors");
require("dotenv").config();
const dbconnect = require("./config/database");
const userRoute=require("./routes/userRoute");
const atsRoute=require("./routes/atsRoute")
const app=express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
  
app.use("/api/v1",userRoute);
app.use("/api/v1",atsRoute);
app.listen(process.env.PORT,()=>{
    console.log("server started");
    dbconnect();
})