const express= require("express");
const { createUser, getUsers, getUserbyID, deleteUser, updateUser } = require("../controllers/userController");
const route= express.Router();


route.post("/users",createUser);
route.get("/users",getUsers);
route.get("/users/:id",getUserbyID);
route.delete("/users/:id",deleteUser);
route.patch("/users/:id",updateUser);
module.exports=route
