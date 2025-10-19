const express= require("express");
const { createUser, getUsers, getUserbyID, deleteUser, updateUser, login } = require("../controllers/userController");
const route= express.Router();
const verifyUser= require("../middleware/auth")


route.post("/users",createUser);
route.post("/login",login);
route.get("/users",verifyUser,getUsers);
route.get("/users/:id",verifyUser,getUserbyID);
route.delete("/users/:id",verifyUser,deleteUser);
route.patch("/users/:id",verifyUser,updateUser);
module.exports=route
