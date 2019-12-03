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
    });
      console.log("Scrape completed!");
      location.reload();  
  });
        
    // WORKING "Clear Articles" button, app.get("/drop-collection")
    // Click event for deleting the collection from the db
    // $("#clear").on("click", event => {
  $("#clear").on("click", function(event) {
    event.preventDefault();
    $.getJSON("/drop-collection", function() {
    });
      // console log in browser
    console.log(" Clear Article clicked: collection dropped");
    $("#display").empty();
  });
        
    //  PUT PUT PUT a saved article in
    // WORKING "Save Article" button: app.put("/saved/:id")
    // Click event to use PUT route with ID to save article clicked on
  $(document).on("click", ".saved", function () {
    var id = $(this).attr("id");
    saveId = id;
    console.log("saveId = "+saveId);

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

// ***************  PENDING CODE **************
  $(".addComment").on("click", function () { 
  // Empty the value of the user box from prior notes entered in another note box
$("#userNote").val("");
  // Save the id from the button   
var id = $(this).attr("id");
console.log("var id from .addComment = "+id); // this works
// console.log("title is: "+data.title);
  // Now make an ajax call for the Article   
$.ajax({
  method: "GET",   
  url: "/articles/" + id, 
})
    // Next, add the note information to the page
  .then(function (data) {
    console.log(data);  // working
    console.log("Same ID from .addComment should be "+id);
    // $("#noteBox").empty();
    $("#userNote").empty();
    $(".modal-title").empty();
    $(".modal-footer").empty(); 
      // The title of the article
    $(".modal-title").append("<h4>" + data.title + "</h3>");
      // If there's a note in the article
    // var button = 
// A button to submit a new note, with the id of the article saved to it
// $(".modal-footer").append("<button data-id='"+ data._id +"' id='savenote'>Save Note</button>");

if (data.note) {
        // Place the body of the note in the body textarea
        console.log("PRIOR note found in article");
        $("#userNote").val(data.note.body);
    $(".modal-footer").empty();  
    // $(".modal-footer").val("");     
}
$(".modal-footer").append("<button class='btn btn-secondary btn-sm' data-dismiss='modal'>Close</button>");
$(".modal-footer").append("<button class='btn btn-primary btn-sm' data-id='"+ data._id +"' id='savenote' data-dismiss='modal'>Save Note</button>");   
  });
});

// SAVE NOTE --- POST 
// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // $(".saveNote").on("click", function () {  
// $("#savenote").on("click", function () {   
var id = $(this).attr("data-id");
        // var id = $(this).attr("id");
        console.log("In POST: id = "+id);
    // Run a POST request to change the note, using what's entered in the inputs 
  $.ajax({
    method: "POST",      
    url: "/notes/" + id,           
    data: {
      body: $("#userNote").val().trim()
    }
  }).then(function(data) {
   console.log(data);  
    console.log("data._id below:"); 
      console.log(data._id); 
      // Empty the notes section
    $("#userNote").empty();
    $(".modal-footer").empty();
  }); 
    // Also, remove the values entered in the input and textarea for note entry
  $("#userNote").val("");
  $(".savedUserNote").val("");
  $(".modal-footer").val("");
});

  // console.log(data);
  // $(".saveNote").attr("data-id", id);
  // $(".saveComment").attr("data-id", id);  
  // $(".article").attr("data-id", id);
  // });
  // $(".savedNote").empty();
  //  });

  // WORKING "Delete Article" button: app.delete("/delete-Article/id")
  // Click event on "Saved Articles" page to delete a saved article 
$(document).on("click", "button.delete", function (event) {
  event.preventDefault();
  let id = $(this).attr('id');
  $.ajax({
    url: "/delete-Article/" + id,
      //   method: "DELETE",
    method: "DELETE"
  })
  .then(function (data) {
    location.reload();
  });
});
    // Is this "delete" being used??
      // $(".deleteArticle").on("click", function () {
      //   let id = $(this).attr("id");
      //   $.ajax("/delete-Article/" + id, {
      //     type: "DELETE"
      //   }).then(function() {
      //     location.reload();
      //   });
      // }); 