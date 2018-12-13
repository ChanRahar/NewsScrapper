var db = require("../models");

// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

app.get("/", (req, res) => res.render("index"));

app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.reddit.com/r/news/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    // Save an empty result object
    var $ = cheerio.load(response.data);
    var handlebarsObject = {
      data: []
    };


    $("a.b5szba-0").each(function (i, element) {

      if ($(element).parent().parent().children().children().children().children("h2").text() === "") {
        console.log("ad")
      } else {
        // Add the text and href of every link, and save them as properties of the result object
        handlebarsObject.data.push({
          title: $(element).parent().parent().children().children().children().children("h2").text(),
          link: $(element).attr("href")
        });
      }

    });
    // If we were able to successfully scrape and save an Article, send a message to the client
    res.render("index", handlebarsObject);
  });
});


// app.get("/saved", (req, res) => res.render("saved", {
//     article: dbArticle
// }));

app.get("/saved", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
        console.log(dbArticle)
      res.render("saved", {
        article: dbArticle
      });
    });
  });
}