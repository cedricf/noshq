var _ = require('lodash');
var Eatery = require('../models/eatery.js');
var EateryService = require('../services/eatery.js');

module.exports = function(app) {

    /*Create */
    app.post('/eatery', function (req, res) {
      new EateryService().create(req.body, function(result, err, object){
        res.json({info: result, error: err, data: object});
      });
    });

    /* Read */
    app.get('/eatery', function(req, res) {
      new EateryService().getAll(function(result, err, object){
        res.json({info: result, error: err, data: object});
      });
    });

    app.get('/eatery/:id', function(req,res) {
      new EateryService().getWithId(req.params.id, function(result, err, object){
        res.json({info: result, error: err, data: object});
      });
    });

    /* Update */
    app.put('/eatery/:id', function (req, res) {
      new EateryService().update(req.params.id, req.body, function(result, err, object){
        res.json({info: result, error: err, data: object});
      });
    });

    /* Delete */
    app.delete('/eatery/:id', function (req, res) {
      new EateryService().delete(req.params.id, function(result, err, object){
        res.json({info: result, error: err, data: object});
      });
    });

}
