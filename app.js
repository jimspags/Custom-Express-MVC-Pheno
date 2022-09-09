// Initialize Express Module
const express = require("express");
const app = express();

// Initialize Session
var session = require('express-session');

// Use session
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// Initialize Routes
const routes = require("./routes");
app.use(routes);

// Set static folders on views and assets
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/assets"));

// Initialize body parser for post data handling
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Set view engine as EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Start server
app.listen(2000, () => {
    console.log("Running on port: 2000");
});
