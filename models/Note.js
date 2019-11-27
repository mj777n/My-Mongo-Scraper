let mongoose = require("mongoose");
// Save a reference to the Schema constructor
let Schema = mongoose.Schema;
// Using the Schema constructor, create a new CommentSchema object
let NoteSchema = new Schema({
    // `title` is required and of type String
    author: {
      type: String,
    },
    // `body` is required and of type String
    body: {
      type: String,
      required: true
    }
  }); 
// This creates the Comment model from the above schema, using mongoose's model method
let Note = mongoose.model("Note", NoteSchema);
// Export the Comment model
module.exports = Note;