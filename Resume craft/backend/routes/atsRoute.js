const express= require("express");
const upload = require("../utils/multer");
const analyzeResume = require("../controllers/atsController");
const verifyUser = require("../middleware/auth");
const route= express.Router();
route.post("/atsScore",verifyUser,upload.single("resume"),analyzeResume);
module.exports=route;