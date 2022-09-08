// Initialize express module
const express = require("express");
const router = express.Router();

// Add your routes below

// Initialize Template Controller
const SampleController = require("./controllers/SampleController");

// Template Route
router.get("/", SampleController.index);

module.exports = router;

