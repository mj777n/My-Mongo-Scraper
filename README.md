# Welcome to "My Mongo Scraper"
# All the News That's Fit to Scrape

### Overview
This full-stack app gives you the news from the New York Times Technology section. 
At the click of a button your news articles will be listed all on a single page - showing the Title and a snipit from the article with a link to the full article itself. 
You'll also be able to add your own comments and notes directly linked to your favorite articles. The notes are saved into a Mongoose database for others to view and add additional comments on as well.

1. The app will scrape and display the following information for each article:

     * Headline - the title of the article
     * Summary - a short summary of the article
     * URL - the url to the original article


### The directory structure is as follows

* The root directory file name is "My-Mongo-Scraper"
 - The same name as the github repository name for the app

  ```
  My-Mongo-Scraper
    - models
        Article.js
        Note.js
        index.js
    - public    
        - assets
            - css
              style.css
            - images
              "background".jpg
        app.js      
    - routes
        routes.js
    - views 
        - layouts
            main.handlebars
        index.handlebars
        saved.handlebars
    server.js       
        
  ```

## Built with
 * HTML and CSS
   - using Bootstrap package for CSS frame and styling
 * JQuery
 * Express framework
 * NPM installed packages:
   * JSON for text handling
   * Express-handlebars
   * Cheerio
   * Axios
 * node.JS 
 * Database used
   - Mongoogse

The app is deployed on Heroku or can also be viewed on your local machine as well.
* Deployed to Heroku under https://calm-mesa-07143.herokuapp.com/
* Deployed to my personal gitHub https://mj777n.github.io/My-Mongo-Scraper/
* Added to Portfolio page https://mj777n.github.io/Responsive-Portfolio/


```Examples of the two collections used: "Articles" and "Notes"
   NOTE: The "note" field showing the ID to the saved "Notes" document under same ID. 
[
{
"saved": true,
"_id": "5de7d7cdca4fb1ada4dc568c",
"link": "/2019/12/04/technology/facebook-npe-team.html",
"title": "Podcasts and Travel Apps? Facebook Is Working on Those",
"snip": "The social network is exploring new product areas through a team dedicated to building the company’s future.By Mike Isaac",
"__v": 0,
"note": "5de7d7e6ca4fb1ada4dc5735"
},


[
{
"_id": "5de7d7e6ca4fb1ada4dc5735",
"body": "Podcast Comment",
"__v": 0
},
```

## Functionality

## ************************************************************* ##
## Check out the Demo of "My Mongo Scraper" App (using TinyTake) ##

[DEMO "MY MONGO DB SCRAPER"](https://ttprivatenew.s3.amazonaws.com/pulse/mjnorato-aol/attachments/12048943/Mongo_Scraper_App_Demo.mp4)

