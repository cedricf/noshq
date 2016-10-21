var Location = require('../models/location.js');

module.exports = function(app) {

    /*Create */
    app.post('/location', function (req, res) {
      var newLocation = new Location();
      newLocation.name = req.body.name;
      newLocation.loc.type = "Point";
      newLocation.loc.coordinates = [req.body.lng, req.body.lat];
      newLocation.save(function(err){
        if(err) {
          res.json({info: 'error during location create', error: err});
        }else{
          res.json({info: 'location created successfully'});
        }
      });
    });

    /* Read */
    app.get('/location', function(req, res) {
      Location.find(function(err, locations) {
        if(err) {
          res.json({info: 'error during find locations', error: err});
        }else{
          res.json({info: 'locations found successfully', data: locations});
        }
      });
    });

    app.get('/location/:id', function(req,res) {
      Location.findById(req.params.id, function(err, location) {
        if(err) {
          res.json({info: 'error during find location', error: err});
        }else{
          if(location) {
            res.json({info: 'location found successfully', data: location});
          }else{
            res.json({info: 'location not found'});
          }
        }
      });
    });

    /* Update */
    app.put('/location/:id', function (req, res) {
      Location.findById(req.params.id, function(err, location) {
        if(err) {
          res.json({info: 'error during find location', error: err});
        }else{
          if(location) {
            _.merge(location, req.body);
            location.save(function(err) {
              if(err) {
                res.json({info: 'error during location update', error: err});
              }else{
                res.json({info: 'location updated successfully'});

              }
            });
          }else{
            res.json({info: 'location not found'});
          }
        }
      });
    });

    /* Delete */
    app.delete('/location/:id', function (req, res) {
      Location.findByIdAndRemove(req.params.id, function(err, locations) {
        if(err) {
          res.json({info: 'error during location remove', error: err});
        }else{
          res.json({info: 'location remove successfully'});
        }
      });
    });

    app.post('/location/:id/near', function(req,res) {
      var query = Location.find({'loc': {
        $near: {
          $geometry: {
            type: "Point" ,
            coordinates: [ req.body.lng , req.body.lat ]
          },
          $maxDistance: req.body.distance
        }
      }});
      query.exec(function (err, location) {
        if (err) {
          console.log(err);
          throw err;
        }

        if (!location) {
          res.json({});
        } else {
          console.log('Found location:' + location);
          res.json(location);
        }
      });
    });

}
