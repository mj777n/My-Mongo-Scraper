var mongoose = require("mongoose");
  // Save a reference to the Schema constructor
var Schema = mongoose.Schema;
  // Using the Schema constructor, create a new Schema object
var NoteSchema = new Schema({
  // `name` is of type String
  name: {
    type: String,
  },
  // `body` is required and of type String
  body: {
    type: String,
    required: true
  }
}); 
  // This creates the Comment model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);
  // Export the Comment model
module.exports = Note;