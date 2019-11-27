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

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-temp1";
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-temp2";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/routes.js")(app);

app.listen(PORT, function () {
    console.log("App running on port 3000!");
});