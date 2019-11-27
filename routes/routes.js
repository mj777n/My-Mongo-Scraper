let axios = require("axios");
let cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {

  app.get("/scrape", function (req, res) {
    axios.get("https://www.nytimes.com/section/technology").then(function (response) {
      var $ = cheerio.load(response.data);
      $("li").each(function (i, element) {           
        let result = {};
        result.link = $(element).find("a").attr("href");  
        result.title = $(element).find("h2").text();                            
        result.snip = $(element).find("p").text();
          // Create a new Article using the `result` object built from scraping     
        db.Article.create(result)
          .then(dbArticle => {
            console.log(dbArticle)
        })  // cose .then
          .catch(err => {
            console.log(err);
        }); // close .catch               
      }); // close .each
      res.send("The SCRAPE was successful")       
    })  // close AXIOS.GET
  }); // close "scrape"

    // GOT IT
  app.get("/", function (req, res) {
    db.Article.find({}, function (err, data) {
      let hbsObject = {
        articles: data
      };
      res.render("index", hbsObject);
      console.log('\n'+'---> app.GET: route "/" Articles displayed')   
    })
  });
// GOT IT
    // Route for getting all Articles from the db
  app.get("/articles", function (req, res) {
     // Grab every document in the Articles collection      
    db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
      console.log(dbArticle) 
      console.log('\n'+'--->app.GET: route "/articles" Displays db with articles in the collection')    
    })
    .catch(function(err) {
      res.json(err);
    });                            
  });
  app.get("/comments", function (req, res) {
    db.Note.find({}, function (error, data) {
        console.log(data)
        res.json(data);
    });
});


  // GOT IT
    // Route to render all the "Saved" articles
  app.get("/saved", function (req, res) {
    db.Article.find({}, function (err, data) {
      let hbsObject = {
        articles: data
      };
      console.log('\n'+'---> app.GET:route "/saved" renders saved articles');
      res.render("saved", hbsObject);
    });
  });

  // GOT but these are not in Mongoose db
  app.get("/comments", function (req, res) {
    db.Note.find({}, function (error, data) {
      console.log(data)
      res.json(data);
    });
  });

    // Route for saving an article to the db
    // using method findOneAndUpdate with id provided from req.params
    // then setting "saved=true" in collection
    // WORKING: Called by .ajax({PUT"/saved/"+id})
  app.put("/saved/:id", function (req, res) {
    db.Article.findByIdAndUpdate({ _id: req.params.id }, 
    {$set: { saved: true }
  
      //  console.log("req.params.id= ");    
    }).then(function (data) {
      res.json(data);
      console.log('\n'+'---> app.PUT: route "/saved/:id": Just saved this article titled: '+data.title)
      console.log("Article ID = "+data._id);
      // console.log("req.params.id = "+rep.params.id);
    });
  });

    // Create a new note
    // GOT IT
  app.post("/notes", function (req, res) {
    console.log(req.body);
    db.Note.create(req.body)
    .then(function (dbComment) {
      return db.Article.findOneAndUpdate({_id: req.params.id},
      {$push: {comment: dbComment._id }}, {new: true});          
    })
    .then(function (dbArticle) {
      res.json(dbArticle);              
      console.log('app.POST "/notes": Saved note for article: '); 
    })
    .catch(function (err) {
      res.json(err);
    });
  });

  // find an existing article by id / populate note
  // GOT IT
  app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
    .populate("comment")
    .then(function (dbArticle) {
      res.json(dbArticle);
      console.log('app.GET "/articles/:id": Find article and populate note field with ID from req.params'); 
    })
    .catch(function (err) {
      res.json(err);
    });
  });
  
    // BEGIN DELETES //
    // Route triggered when "Clear Articles" clicked
    // Using method "deleteMany" on collection
  app.get("/drop-collection", function (req, res) {
    db.Article.deleteMany({}, function (err, del) {
    });
    console.log("\n"+"---> Collection deleted: Clear Articles clicked")
    res.send("res.send statement in drop-collection get");
  });
    // Remove ("delete") a Saved article
  app.delete("/delete-Article/:id", function (req, res) {
    // console.log(req.body);
    db.Article.findByIdAndUpdate({ _id: req.params.id },
    {
      $set: { saved: false }
    }).then(function (data) {
        res.json(data);
    });
    console.log("\n"+"---> A Saved Article was deleted: Delete clicked")
  });

  app.delete("/delete-comment/:id", function (req, res) {
    db.Note.findByIdAndRemove(req.params.id, (err, comment) => {
      if (err) return res.status(500).send(err);
        return res.status(200).send();
    });
  });
};