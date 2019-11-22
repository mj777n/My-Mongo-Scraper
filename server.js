var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
  // require Handlebars for Express into a var, just like var express requires Express
var exphbs = require("express-handlebars");
  // Our scraping tools
  // Axios is a promised-based http library, similar to jQuery's Ajax method
  // It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
  // Require models
// var db = require("./models");

  // Set up our port (either port .env or 8080 for Heroku deployment)
var PORT = process.env.PORT || 8080;

  // Initialize Express
var app = express();

  // Get Handlebars started
  // Use "main" for rendering html to the browser   
var exphbs = require("express-handlebars");  
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
  // Configure middleware //
  // ******************** //
  // Use morgan logger for logging requests
  // Set the app up with morgan.
  // morgan is used to log the HTTP Requests. By setting morgan to 'dev'
  // the :status token will be colored red for server error codes,
  // yellow for client error codes, cyan for redirection codes,
  // and uncolored for all other codes.
  // Configure the app for morgan and body parsing with express.json and express.urlEncoded
app.use(logger("dev"));
  // Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));
   // Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error",console.error.bind(console,"db connection error: "));
db.once("open", function() {
  console.log("And we are connected to Mongoose, Yay!");
});

  // Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
console.log("\n"+"My MONGO SCRAPER server is listening on: http://localhost:" + PORT+"\n");
});
  // Routes