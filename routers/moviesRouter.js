//importiamo express
const express = require('express');

//importiamo il router
const router = express.Router();

//importiamo il controller
const moviesController = require('../controllers/moviesController');

//definizione delle rotte

//rotta index
router.get('/', moviesController.index);

//rotta show
router.get('/:id' , moviesController.show);

//esportiamo il router
module.exports = router;