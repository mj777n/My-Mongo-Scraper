var express = require("express");
  // Import the model (burger.js) to use its database functions.
  // var burger = require("../models/burger.js");
var router = express.Router();
var path = require("path");
  // Our scraping tools

// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var request = require("request");
var cheerio = require("cheerio");

var Comment = require ("../models/Comment");
var Article = require ("../models/Article");

router.get("/", function () {
    
})