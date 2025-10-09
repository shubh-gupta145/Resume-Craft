const express= require("express");
const { createUser, getUsers, getUserbyID, deleteUser, updateUser, login } = require("../controllers/userController");
const route= express.Router();


route.post("/users",createUser);
route.post("/login",login);
route.get("/users",getUsers);
route.get("/users/:id",getUserbyID);
route.delete("/users/:id",deleteUser);
route.patch("/users/:id",updateUser);
module.exports=route
