var express = require("express"); //
var mongoose = require("mongoose"); //
var exphbs = require("express-handlebars"); //

  // Establish a var for the port connection
var PORT = process.env.PORT || 3000;

  // Initialize Express
var app = express();

  // Set up path for neccessary files
var db = require("./models");
require("./routes/routes.js")(app);

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

  // Establish Handlebars
app.engine("handlebars", exphbs({ layout: "main" }));
app.set("view engine", "handlebars");

  // Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-scraperdb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function() {
  console.log("\n"+"*********************************************");
  console.log("The server is happily listening on port " + PORT);
  console.log("And is also connected to Mongoose, Yay!");
  console.log('The Collection name is: "mongo-scraperdb"');
  console.log("*********************************************");
});