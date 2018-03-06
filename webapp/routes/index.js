var express = require('express');
var request = require("request");
var mongoose = require('mongoose');
var assert = require('assert');
var router = express.Router();

//var Cases = require('../models/filed_cases');
var Case = require('../models/filed_cases');

mongoose.connect('mongodb://localhost:27017/breathalyzer_db');

/* GET home page. */
router.get('/', function(req, res, next) {

  Case.find(function(err,docs){
    var dataChunks = [];
    var chunkSize = 4;
    for(var i=0;i<docs.length;i+=chunkSize){
      dataChunks.push(docs.slice(i,i+chunkSize));
    }
    res.render('index',{title:'Smart Breathalyzer', cases : dataChunks});
  });
});

router.get('/caseFor', function(req, res,next) {
  var nic = req.query.nic;
  var veh = req.query.veh;
  var alco = req.query.alco;
  var lat = req.query.lat;
  var lng = req.query.lng;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=YOUR_API_KEY";
  request(url, function(error, response, body) {

    var jsonContent = JSON.parse(body);
    var status = jsonContent.status;

    if (status === 'OK') {
      if (jsonContent.results.length!=0) {
        var place = jsonContent.results[0].formatted_address;
          new Case({
              person_nic :nic,
              vehicle_num: veh,
              alco_level: alco,
              location: {
                place:place,
                latitude:lat,
                longitude:lng
            }
        }).save(function(err,results){
          assert.equal(null,error);
        });

        ///res.send("["+nic+","+veh+","+alco+","+lat+","+lng+","+place+"]");

      } else {
        res.send('No results found');
      }
    } else {
      res.send('Geocoder failed due to: ' + status);
    }
 });
res.redirect('/');
});

module.exports = router;
