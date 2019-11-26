var mongoose = require("mongoose");
  // Save a reference to the Schema constructor
var Schema = mongoose.Schema; 
  // Using the Schema constructor, create a new UserSchema object
var  ArticleSchema = new Schema({
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
  snip: {
    type: String,
    required: false
  },
  // `note` is an object that stores the Note id
  // The ref property links the ObjectId to the Note model
  // This allows to populate the Article with it's associated Note
  notes: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  saved: {
    type: Boolean,
    default: false
  },
  article: String
});
  // This creates the model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);
  // Export the Article model
module.exports = Article;