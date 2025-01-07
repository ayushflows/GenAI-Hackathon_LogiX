const express = require("express");
const router = express.Router();


router
    .route("/data")
    .get((req,res)=>{res.send("Welcome to GenAI Hackathon Backend")});


module.exports = router;