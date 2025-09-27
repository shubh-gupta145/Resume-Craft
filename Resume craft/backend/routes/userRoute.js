const express= require("express");
const { createUser, getUsers } = require("../controllers/userController");
const route= express.Router();


route.post("/users",createUser);
route.get("/users",getUsers);
module.exports=route
