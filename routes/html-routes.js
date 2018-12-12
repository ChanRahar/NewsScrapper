var db = require("../models");

module.exports = function (app) {

app.get("/", (req, res) => res.render("index"));

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