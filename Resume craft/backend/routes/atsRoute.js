const express= require("express");
const upload = require("../utils/multer");
const analyzeResume = require("../controllers/atsController");
const route= express.Router();
route.post("/atsScore",upload.single("resume"),analyzeResume);
module.exports=route;