var _ = require('lodash');
var Eatery = require('../models/eatery.js');

EateryService = function(){};

EateryService.prototype.create = function(json, callback){
  var newEatery= new Eatery(json);
  newEatery.save(function(err, eatery){
    if(err) {
      callback('Error during create', err, null);
    }else{
      callback('Created successfully', null, eatery);
    }
  });
};

EateryService.prototype.getAll = function(callback){
  Eatery.find(function(err, eaterys) {
    if(err) {
      callback('Error during find Eaterys', err, null);
    }else{
      callback('Eaterys found successfully', null, eaterys);
    }
  });
};

EateryService.prototype.getWithId = function(id, callback){
  Eatery.findById(id, function(err, eatery) {
    if(err) {
      callback('Error during find Eatery', err, null);
    }else{
      if(eatery) {
        callback('Eatery found successfully', null, eatery);
      }else{
        callback('Eatery not found', null, {});
      }
    }
  });
};

EateryService.prototype.update = function(id, json, callback){
  Eatery.findById(id, function(err, eatery) {
    if(err) {
      callback('Error during find Eatery', err, null);
    }else{
      if(eatery) {
        _.merge(eatery, json);
        eatery.save(function(err, eatery) {
          if(err) {
            callback('Error during Eatery update', err, null);
          }else{
            callback('Eatery updated successfully', null, eatery);
          }
        });
      }else{
        callback('Eatery not found', null, {});
      }
    }
  });
};

EateryService.prototype.delete = function(id, callback){
  Eatery.findByIdAndRemove(id, function(err) {
    if(err) {
      callback('Error during Eatery remove', err, null);
    }else{
      callback('Eatery remove successfully', null, null);
    }
  });
};

module.exports = EateryService;
