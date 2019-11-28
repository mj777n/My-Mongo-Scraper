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
          // .then(dbArticle => {
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
      console.log('\n'+'---> app.PUT: route "/saved/:id" Just saved this article titled: '+data.title)
      console.log("Article ID = "+data._id);
      // console.log("req.params.id = "+rep.params.id);
    });
  });

    // Create a new note
    // GOT IT
    // app.post("/notes/:id", function (req, res) {
app.post("/notes/", function (req, res) {   
    console.log(req.body.body );
    var savedNoteId = req.body.body;
    // var req_params = 
    // console.log("var savedNoteId = "+savedNoteId);
    db.Note.create(req.body)
    // console.log(req.body)
    .then(function (dbComment) {
      return db.Article.findOneAndUpdate({_id: req.params.id},
      {$push: {comment: dbComment._id }}, {new: true});          
    })
    .then(function (dbArticle) {
      res.json(dbArticle);              
      console.log('\n'+'---> app.POST: route "/notes" Saved note for article: '); 
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
      console.log('\n'+'---> app.GET: route "/articles/:id" Find the Saved Article and populate note field with ID from req.params'); 
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
    console.log('\n'+'---> app.GET: route "/drop-collection" Clear Articles button clicked'   );
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
    // console.log("\n"+"---> A Saved Article was deleted: Delete clicked"+"\n");
    console.log('\n'+'---> app.DELETE: route "/delete-Article/:id" You just deleted a saved article'+'\n');
  });

  app.delete("/delete-comment/:id", function (req, res) {
    db.Note.findByIdAndRemove(req.params.id, (err, comment) => {
      if (err) return res.status(500).send(err);
        return res.status(200).send();
    });
  });
};