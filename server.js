var express = require("express"); //
var logger = require("morgan"); //
var mongoose = require("mongoose"); //
var exphbs = require("express-handlebars"); //

var PORT = process.env.PORT || 3000;

  // Initialize Express
var app = express();
var db = require("./models");

  // Set up neccessary path to routes for var app
require("./routes/routes")(app);

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ layout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Heroku
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds127644.mlab.com:27644/heroku_n6c2rpls";

// Connect to the Mongo DB
  //  var MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost/scraperDB";
   var MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost/myMongoSraper";
   mongoose.Promise = Promise;
   mongoose.connect(MONGODB_URL, {useNewUrlParser: true });
   
   var db = mongoose.connection;
   db.on("error",console.error.bind(console,"db connection error: "));
   db.once("open", function() {
     console.log("And is also connected to Mongoose, Yay!");
     console.log('The Collection name is: "myMongoSraper"');
    });

   app.listen(PORT, function() {
     console.log("\n"+"*******************************************");
     console.log("The server is happily listening on port " + PORT);
   });