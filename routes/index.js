const express = require('express');
const router = express.Router();
//const baseController = require('../controllers');

//routes.get('/', baseController.getName);
//routes.get('/awesome', baseController.awesomeperson);
router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));

module.exports = router;
