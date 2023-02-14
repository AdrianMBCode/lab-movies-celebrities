// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get('/create', (req, res, next) => {
    Celebrity.find()
      .then((Celebrity) => {
        res.render('movies/new-movie', { Celebrity });
      })
      .catch((err) =>  next(err));

  });
  
router.post('/create', (req, res, next) =>{
    let {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
    .populate("cast")
    .then(() => {
        res.redirect('/movies');
    })
    .catch((err) => next(err));

});

module.exports = router;