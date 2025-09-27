const express= require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const User = require("./model/user");
const app=express();
app.use(express.json());
app.use(cors());
  
async function dbconnect() {
    await mongoose.connect("mongodb://localhost:27017/resumeCraft");
    console.log("database connected");
}
app.get("/",(req,res)=>{
    res.send("api working");
})
app.post("/signup",async(req,res)=>{
    try {
        const { name,email,password }=req.body;
        const user=new User({ name,email,password });
        await user.save();
        res.status(200).json({message:"User registered successfully"})
    } catch (error) {
        res.status(500).json({error:"Something went wrong"});
    };
    
})
app.listen(3000,()=>{
    console.log("server started");
    dbconnect();
})