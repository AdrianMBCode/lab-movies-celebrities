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

router.get("/:id", (req, res, next) => {
  let movieId = req.params.id
  Movie.findById(movieId)
  .populate("cast")
  .then(result => {
    res.render("movies/movie-details", {result})
  })
  .catch(err => { next(err) })
})

router.post("/:id/delete", (req, res, next) => {
  let deleteId = req.params.id
  Movie.findByIdAndRemove(deleteId)
    .then(() => {
      res.redirect("/movies")
    })
    .catch(err => { next(err) })
    
})

router.get("/:id/edit", (req, res, next) => {
  let movieId = req.params.id
  Movie.findByIdAndUpdate(movieId)
  .then(result => {
    let movie = result;
    Celebrity.find()
    .then(result => {
      let celebrities = result
      res.render("movies/edit-movie",  {movie, celebrities})
    })
  })
  .catch(err => { next(err) })
})

router.post("/:id/edit", (req, res, next) => {
  const {title, genre, plot, cast} = req.body
  let movieId = req.params.id
  Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast})
  .then(result => {
    res.redirect(`/movies/${movieId}`)
  })
  .catch(err => { next(err) })
})



  

module.exports = router;