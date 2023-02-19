// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/", (req, res, next) => {
  Movie.find()
  .populate("cast")
      .then(movie => {
          res.render("movies/movies", { movie })
      })
      .catch(err => next(err))

})

router.get("/create", (req, res, next) => {
  Celebrity.find()
      .then(celebrities => {
          res.render("movies/new-movie", { celebrities })
      })
      .catch(err => { next(err) })
})

router.post("/create", (req, res, next) => {
  let { title, genre, plot, cast } = req.body
  Movie.create({ title, genre, plot, cast })
      .then(result => {
          res.redirect("/movies")
      })
      .catch(err => { next(err) })
})
  

module.exports = router;