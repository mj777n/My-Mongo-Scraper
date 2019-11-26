$( () => {

    $("#home").on("click", event => {
      event.preventDefault();
      $.get("/", () => {
        console.log("Home")
      })
    });
  
    $("#scrape").on("click", event => {
      event.preventDefault();
      $.getJSON("/scrape", () => {
      });
      console.log("Scrape complted!");
      location.reload();  
    });
    
      // Click event for deleting the collection from the db
    $("#clear").on("click", event => {
      event.preventDefault();
      $.getJSON("/drop-collection", () => {
      });
      console.log("collection dropped");
      $("#display").empty();
    });
      // Click event to use PUT route with ID from article clicked on
    $(document).on("click", ".saved", function () {
      let id = $(this).attr("id");
      $(this).parents(".card").remove();
      $.ajax({
        type: "PUT",
        url: "/saved/" + id,
      }).then((response) => {
      console.log(JSON.stringify(response));
      });
    });
  });
  
  $(".deleteArticle").on("click", function () {
    console.log("Delete button");
    let id = $(this).attr("id");
    $.ajax("/delete-Article/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("Deleted article", id);
      location.reload();
    });
  });
  
  $(".saveNote").on("click", function () {
    let id = $(this).attr("id");
    console.log(data)
    $.ajax({
      url: "/notes",
      method: "POST",
      data: {
        body: $(".userNote").val().trim()
      }
    }).then(
      function(data) {
        console.log(data);
        $(".userNote").val("");
      });
  
  $(".savedNote").empty();
  });
  
  $(".addNote").on("click", function () {
  let id = $(this).attr('id');
  $(".saveNote").attr("data-id", id);
  $(".article").attr("data-id", id);
  $.ajax({
      url: "/articles/" + id,
      method: "GET",
  }).then(
      function (data) {
          console.log(data);
          displayArticles(data);
      });
  $(".savedNote").empty();
  });
  
  $(document).on("click", "button.delete", function (event) {
  event.preventDefault();
  let id = $(this).attr('id');
  $.ajax({
      url: "/delete-Article/" + id,
      method: "DELETE",
  }).then(
      function (data) {
          console.log(data);
          location.reload();
      });
  });