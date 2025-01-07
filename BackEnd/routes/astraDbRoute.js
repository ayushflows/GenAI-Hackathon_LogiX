const express = require("express");
const router = express.Router();
const astraDbCollection = require("../controllers/astraDbController.js");

router
    .route("/socialAccount")
    .post(astraDbCollection.astraDb_socialAccount);

router
    .route("/data")
    .post(astraDbCollection.astraDb_data);

router
    .route("/fetchdata")
    .post(astraDbCollection.astraDb_fetchdata);

module.exports = router;