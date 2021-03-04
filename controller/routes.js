const controller = require('./controller'),
routes = require('express').Router();
routes.get("/", controller.getProducts);
routes.get("/search", controller.findProducts);
module.exports = routes;