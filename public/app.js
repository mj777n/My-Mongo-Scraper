$(document).ready(function() {
    
    // WORKING HOME PAGE
  $("#home").on("click", function(event) {
    event.preventDefault();
    $.get("/", function() {
      console.log("Home")
    });
  });
    
    // WORKING "Scrape Articles" button - but you have to click twice
  $("#scrape").on("click", function(event) {
    event.preventDefault();
    $.getJSON("/scrape", function() {
      location.reload();  // not exactly working as hoped
    });
      console.log("Scrape completed!");
      location.reload(); // not exactly working as hoped
      // Still have to click home or refresh to see scraped articles rendered
  });
       
    // WORKING "Clear Articles" button, app.get("/drop-collection")
    // Click event for deleting the collection from the db
  $("#clear").on("click", function(event) {
    event.preventDefault();
    $.getJSON("/drop-collection", function() {
    });
      // console log in browser
    console.log(" Clear Article clicked: collection dropped");
    $("#display").empty();
  });
        
    //  PUT a saved article/ render to browser in Saved Articles page
    // WORKING "Save Article" button: app.put("/saved/:id")
    // Click event to use PUT route with ID to save article clicked on
  $(document).on("click", ".saved", function () {
      // Grab the ID of the element(article) clicked
    var id = $(this).attr("id");
    saveId = id;
    $(this).parents(".card").remove();
    $.ajax({
      type: "PUT",
      url: "/saved/" + saveId
    }).then(function(result) {
        console.log(JSON.stringify(result));
        console.log("Just saved article id# "+saveId);
    });
  });
});

  // WORKING "Comment" button, app.get("/"/articles/:id")
  // Click event for adding a comment to a saved article
$(".addComment").on("click", function () { 
    // Empty the value of the user box from prior notes entered in another note box
  $("#userNote").val("");
   // Grab the ID of the element(article) clicked 
  var id = $(this).attr("id");
  console.log("var id from .addComment = "+id); // this works
    // Now make an ajax call for the Article with the ID  
  $.ajax({
    method: "GET",   
    url: "/articles/" + id, 
  })
    // Next, add the note information to the page
  .then(function (data) {
    console.log(data);  // working
    $("#userNote").empty();
    $(".modal-title").empty();
    $(".modal-footer").empty(); 
      // Add (append) The title of the article to the modal box
    $(".modal-title").append("<h5>" + data.title + "</h5>");
      // Check If there's already a note in the article
    if (data.note) { 
        // If so, place the body of the existing note in the body textarea
      console.log("PRIOR note found in article");
      $("#userNote").val(data.note.body);
        // Empty the modal footer of buttons
      $(".modal-footer").empty();    
    }
      // Add (append) the 2 buttons needed into the modal footer
      // Key to ensuring the ID is captured on the element when clicked
      // Click "Save Note" to create(submit) a new note, with the id of the article saved to it
    $(".modal-footer").append("<button class='btn btn-secondary btn-sm' data-dismiss='modal'>Close</button>");
    $(".modal-footer").append("<button class='btn btn-primary btn-sm' data-id='"+ data._id +"' id='saveNote' data-dismiss='modal'>Save Note</button>");   
  });  // close .then
});  // close "Add comment" button/function block

  // SAVE NOTE --- POST 
  // Triggered When you click the savenote button
$(document).on("click", "#saveNote", function() { 
    // Grab the ID of the element(article) clicked
  var id = $(this).attr("data-id");
    // Run a POST request to create a new note in the Notes collection, using what's entered in the inputs 
    // Passing the ID and the entered userNotes (in data field)
    $.ajax({
      method: "POST",      
      url: "/notes/" + id,           
      data: {
        body: $("#userNote").val().trim()
      }
    }).then(function(data) {
      console.log(data);  
        // Empty the notes section
      $("#userNote").empty();
      $(".modal-footer").empty();
    }); 
      // Also, remove the values entered in the input and textarea for note entry
    $("#userNote").val("");
    $(".savedUserNote").val("");
    $(".modal-footer").val("");
});

  // WORKING "Delete Article" button: app.delete("/delete-Article/id")
  // Click event on "Saved Articles" page to delete a saved article 
$(document).on("click", "button.delete", function (event) {
  event.preventDefault();
  let id = $(this).attr('id');
  $.ajax({
    url: "/delete-Article/" + id,
    method: "DELETE"
  })
  .then(function (data) {
    location.reload();
  });
});