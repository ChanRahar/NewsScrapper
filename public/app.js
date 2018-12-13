$(document).ready(function () {
  $('.scrape').on("click", function () { // Scrap Articles Request
    fetch("/scrape", { method: "GET" }).then(() => window.location.replace("/scrape"));
  });

  // save articles to the db
  $('.save-button').on("click", function () {
    console.log("clicked")
    alert("Article Saved");
    $.post("/articles/", {
      title: $(this).attr("title"),
      link: $(this).attr("link")
    }, function () {
      window.location.href = "#";
    });
  });

  $(".save-comment").on("click", function () {
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    var data = {
      body: $("#text" + thisId).val()
    }
    console.log(data);
    $.post("/articles/" + thisId, data, function () {
      window.location.href = "#";
    });
  })

  $(".comment-btn").on("click", function () {
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    $.get("/articles/" + thisId, function (data) {
      console.log(data);
      $("#" + thisId).val(data.note.body)
    });
  })


});