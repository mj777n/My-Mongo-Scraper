var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
// Using the Schema constructor, create a new ArticleSchema object
var ArticleSchema = new Schema({
    // `title` is required and of type String
    title: {
      type: String,
      required: true
    },
    // `link` is required and of type String
    link: {
      type: String,
      required: true
    },
    // `comment` is an array (object) that stores a Note id
    // The ref property links the ObjectId to the Comment model
    // This allows us to populate the Article with an associated Comment
    comment: [
      {
      type: Schema.Types.ObjectId,
      ref: "Comment"
      }
    ]
  }); 
// This creates the Article model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);
// Export the Article model
module.exports = Article;