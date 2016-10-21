var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var eaterySchema = mongoose.Schema({
  name: String,
  description: String,
  stars: Number,
  location_id: ObjectId
});

module.exports = mongoose.model('Eatery', eaterySchema);
