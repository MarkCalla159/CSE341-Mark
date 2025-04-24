const routes = require('express').Router();
const baseController = require('../controllers');

routes.get('/', baseController.getName);

routes.get('/awesome', baseController.awesomeperson);

module.exports = routes;