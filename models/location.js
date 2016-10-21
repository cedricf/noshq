var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  name: String,
  loc: {
      type: { type: String },
      coordinates: [],
  }
});

locationSchema.index({ "loc": "2dsphere" });
/*
locationSchema.methods.near = function near(coordinates, distance, callback) {
  Location.aggregate(
      [
          { "$geoNear": {
              "near": {
                  "type": "Point",
                  "coordinates": coordinates
              },
              "distanceField": "distance",
              "sperical": true,
              "maxDistance": distance
          }}
      ],
      function(err,results) {
        callback(err, results);
      }
  )
}
*/
module.exports = mongoose.model('Location', locationSchema);

/* Sample of finding point near location
User.aggregate(
    [
        { "$geoNear": {
            "near": {
                "type": "Point",
                "coordinates": [<long>,<lat>]
            },
            "distanceField": "distance",
            "sperical": true,
            "maxDistance": 10000
        }}
    ],
    function(err,results) {

    }
)
*/
