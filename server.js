var express = require("express"); //
var logger = require("morgan"); //
var mongoose = require("mongoose"); //
var exphbs = require("express-handlebars"); //
// var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();
// var db = require("./models");

// require("./routes/apiRoutes")(app, db);
// require("./routes/htmlRoutes")(app, db);

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ layout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Heroku
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds127644.mlab.com:27644/heroku_n6c2rpls";

// Connect to the Mongo DB
   var MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost/unit18Populater";
   mongoose.Promise = Promise;
   mongoose.connect(MONGODB_URL, {useNewUrlParser: true });
   
   var db = mongoose.connection;
   db.on("error",console.error.bind(console,"db connection error: "));
   db.once("open", function() {
     console.log("And is also connected to Mongoose, Yay!");
   });

   app.listen(PORT, function() {
     console.log("\n"+"*******************************************");
     console.log("The server is happily listening on port " + PORT);
   });