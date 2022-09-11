// Initialize express module
const express = require("express");
const router = express.Router();

// Initialize body parser for post data handling. Connect to router
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

// Add your routes below












// Initialize Template Controller
const SampleController = require("./controllers/SampleController");

// Template Route
router.get("/", SampleController.index);

module.exports = router;

