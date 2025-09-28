const express= require("express");
const { createUser, getUsers, getUserbyID } = require("../controllers/userController");
const route= express.Router();


route.post("/users",createUser);
route.get("/users",getUsers);
route.get("/users/:id",getUserbyID);
module.exports=route
