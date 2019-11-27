$( () => {
    // $(function() {  ...  })
    // $(document).ready()
    // $(document).ready(function() {CODE HERE});
    
        // WORKING HOME PAGE
      $("#home").on("click", event => {
        event.preventDefault();
        $.get("/", () => {
          console.log("Home")
        })
      });
    
        // WORKING "Scrape Articles" button - but you have to click twice
      $("#scrape").on("click", event => {
        event.preventDefault();
        $.getJSON("/scrape", () => {
        });
          console.log("Scrape complted!");
          location.reload();  
      });
        
        // WORKING "Clear Articles" button, app.get("/drop-collection")
        // Click event for deleting the collection from the db
      $("#clear").on("click", event => {
        event.preventDefault();
        $.getJSON("/drop-collection", () => {
        });
          // console log in browser
        console.log(" Clear Article clicked: collection dropped");
        $("#display").empty();
      });
    
        // WORKING "Save Article" button: app.put("/saved/:id")
        // Click event to use PUT route with ID to save article clicked on
      $(document).on("click", ".saved", function () {
        let id = $(this).attr("id");
        $(this).parents(".card").remove();
        $.ajax({
          type: "PUT",
          url: "/saved/" + id,
        }).then((response) => {
        // console.log(JSON.stringify(response));
        });
      });
    });
       
      $(".saveNote").on("click", function () {
        let id = $(this).attr("id");
        console.log("This is the var id: "+id);
        console.log("inside APP line 53");
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
        // $("#saveNote").val("");
      // $(".saveNote").val("");
      });
    
      $(".addNote").on("click", function () {
      // $(".addNote").on("click", function () {
        // $(document).on("click", function () {   
      let id = $(this).attr('id');
      $(".saveNote").attr("data-id", id);
      // $(".saveComment").attr("data-id", id);  
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
    
       // WORKING "Delete Article" button: app.delete("/delete-Article/id")
        // Click event on "Saved Articles" page to delete a saved article 
      $(document).on("click", "button.delete", function (event) {
        event.preventDefault();
        let id = $(this).attr('id');
        $.ajax({
            url: "/delete-Article/" + id,
            method: "DELETE",
        }).then(
            function (data) {
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