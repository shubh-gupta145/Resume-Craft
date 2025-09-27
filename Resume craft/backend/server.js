const express= require("express");
const cors=require("cors");
const dbconnect = require("./config/database");
const userRoute=require("./routes/userRoute")
const app=express();
app.use(express.json());
app.use(cors());
  
app.use("/api/v1",userRoute);
app.listen(3000,()=>{
    console.log("server started");
    dbconnect();
})