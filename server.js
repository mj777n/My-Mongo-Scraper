let express = require("express"); //
let mongoose = require("mongoose"); //
let exphbs = require("express-handlebars"); //

var PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();
var db = require("./models");


app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ layout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
//******************************************* */
  // Connect to the Mongo DB using local host
  // var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-scraperdb";
 
    // Or connect via Heroku using mLabs addon. But this URI is not connecting.
    // Geting a bunch of "H10" error messages from Heroku Logs. Ughhhhh!!!

    var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_8j8v3k8b:RedSox15@ds251948.mlab.com:51948/heroku_8j8v3k8b";
  // var MONGODB_URI = "mongodb://heroku_8j8v3k8b:RedSox15@ds251948.mlab.com:51948/heroku_8j8v3k8b";
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
  require("./routes/routes.js")(app);
    
  // app.listen(process.env.PORT || 3000, function() {  
  app.listen(PORT, function() {
  //   console.log("\n"+"*********************************************");
    console.log("The server is happily listening on port " + PORT);
    console.log("And is also connected to Mongoose, Yay!");
    console.log('The Collection name is: "mongo-scraperdb"');
    console.log("*********************************************");
  });
