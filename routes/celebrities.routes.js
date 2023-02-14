// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next) => {
    console.log(req.body);
    let newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };
    console.log(newCelebrity);
    Celebrity.create(newCelebrity)
    .then (result =>{
        console.log(result);
        res.redirect("/celebrities");
    })
    .catch (err => next(err));
})
router.get('/', (req, res, next) => {
    Celebrity.find()
    .then (result => {
        res.render('celebrities/celebrities', {celebrities: result})

    })
    .catch (err => (err));
})

module.exports = router;