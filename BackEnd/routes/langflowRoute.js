const express = require("express");
const router = express.Router();
const langflowCollection = require("../controllers/langflowController.js");

router
    .route("/dataAnalysis")
    .post(langflowCollection.langflow);

module.exports = router;