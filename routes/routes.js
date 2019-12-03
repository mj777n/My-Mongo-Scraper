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
          .then(function(dbArticle) {
            console.log(dbArticle)
            //  location.reload();           
          }) 
          .then(function(data) {
            console.log("Scrape completed");
            console.log('---> app.GET: route "/scrape" Scrape articles from website');   
          })  // cose .then
          // .catch(err => {
          .catch(function(err) {
            console.log(err);
          }); // close .catch               
      } ); // close .each
      res.send("The SCRAPE was successful")       
    }); // close AXIOS.GET
  }); // close "scrape"

    // GOT IT
    // Route for home page
  app.get("/", function (req, res) {
    db.Article.find({}, function (err, data) {
      let hbsObject = {
        articles: data
      };
      res.render("index", hbsObject);
      console.log('\n'+'---> app.GET: route "/" Renders all articles to the home page')   
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

    // GOT IT
    // Route for getting all Notes from the db
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
      console.log('\n'+'---> app.GET: route "/saved" Renders saved articles to the screen');
      res.render("saved", hbsObject);
    });
  });

    // Route for saving an article to the db
    // Triggered when "Save Article" button clicked
    // using method findByIdAndUpdate with id provided from req.params
    // then setting "saved=true" in collection
    // WORKING: Called by .ajax({PUT"/saved/"+id})
  app.put("/saved/:id", function (req, res) {
    db.Article.findByIdAndUpdate({ _id: req.params.id }, 
    {$set: { saved: true } 
      //  console.log("req.params.id= ");    
    }).then(function (data) {
      res.json(data);
      console.log('\n'+'---> app.PUT: route "/saved/:id" Just saved this article titled: '+data.title)
      console.log("Article ID = "+data._id);
    });
  });

  // find an existing article by id / populate note
  // Triggered when COMMENT button clicked
  app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
      // Then populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      // console.log(dbArticle);
      res.json(dbArticle);
  console.log("Inside routes/GET ariticle by ID / COMMENT BUTTON");
  console.log(req.params.id);
  console.log('\n'+'---> app.GET: route "/articles/:id" Find the Saved Article and populate note field with ID from req.params');     
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });

    // Create a new note
    // Triggered on SAVE COMMENT button
    // app.post("/notes/:id", function (req, res) {
app.post("/notes/:id", function(req, res) {  
    // Create a new note and pass the req.body to the entry 
  db.Note.create(req.body)
    .then(function (dbNote) { 
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. 
      // Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User 
      // Since the mongoose query returns a promise, we can chain another `.then` which receives the result of the query     
    // console.log("in routes POST, line above return statment");
      return db.Article.findOneAndUpdate({_id: req.params.id},        
      // {$push: {note: dbNote._id }}, {new: true}); // WORKS!!! 
      {note: dbNote._id});
      // {new: true}); // WORKS ALSO       
  })
  .then(function (dbArticle) {
      // If this was able to successfully update an Article, send it back to the client  
    res.json(dbArticle);              
    console.log('\n'+'---> app.POST: route "/notes" Saved note for article: '+dbArticle._id); 
    console.log(dbArticle);  // NOW HAS THE NOTE FIELD SAVED CORRECTLY
  })
  .catch(function (err) {
      // If an error occurred, send it to the client   
    res.json(err);
  });
});
  
    // BEGIN DELETES //
    // Route triggered when "Clear Articles" clicked
    // Using method "deleteMany" on collection
  app.get("/drop-collection", function (req, res) {
    db.Article.deleteMany({}, function (err, del) {
    });
    console.log('\n'+'---> app.GET: route "/drop-collection" Clear Articles button clicked'   );
    res.send("res.send statement in drop-collection get");
  });

    // Remove ("delete") a Saved article
  app.delete("/delete-Article/:id", function (req, res) {
    db.Article.findByIdAndUpdate({ _id: req.params.id },
    {
      $set: { saved: false }
    }).then(function (data) {
        res.json(data);
    }); 
    console.log('\n'+'---> app.DELETE: route "/delete-Article/:id" You just deleted a saved article');
  });

  app.delete("/delete-comment/:id", function (req, res) {
    db.Note.findByIdAndRemove(req.params.id, (err, comment) => {
      if (err) return res.status(500).send(err);
        return res.status(200).send();
    });
  });
};