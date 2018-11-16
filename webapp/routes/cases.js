var express = require('express');
var request = require("request");
var mongoose = require('mongoose');
var assert = require('assert');
var router = express.Router();

var Case = require('../models/cases');
var Device = require('../models/devices');



var characterTable = ["A", "B", "C","D", "E", "F","G", "H", "I","J", "K", "L","M", "N", "O","P", "Q", "R","S", "T", "U","V","W","X","Y","Z",
                      "0","1","2","3","4","5","6","7","8","9"
                      ];

router.get('/', function(req, res, next) {

  Case.find(function(err,docs){
    var dataChunks = [];
    var chunkSize = 4;

// decrypt the all the comming data from the database
// (only the license id)
    for(var i=0;i<docs.length;i++){
        docs[i].license_id = generatePlaneTxt(docs[i].license_id);
    }

    for(var i=0;i<docs.length;i+=chunkSize){
      dataChunks.push(docs.slice(i,i+chunkSize));
    }

    res.render('cases/index',{title:'SmartBreathalyZ | cases',topic:'Recorded Cases',
    sub_topic:'fa-folder-open',cases : dataChunks});
  });
});


router.get('/:deviceID', function(req, res,next) {

  var devID = req.params.deviceID;

  Device.findOne({'device_id':devID},function(err,device) {
      if(err){
        //
      }
      if(device){
        // if there is a device
        var lic = req.query.lic;//license_id
        var veh = req.query.veh;
        var alco = req.query.alco;
      //  var alco = alco1.toFixed(4);
        var lat = req.query.lat;
        var lng = req.query.lng;

        /*var lic = '940272645V';
        var veh = 'AAY4589';
        var alco = 56;*/

        // get the current date
        var  current_date = new Date();
        var year = current_date.getYear();
        var month = current_date.getMonth() + 1;
        var date = current_date.getDate();

        if(year < 1000){
          year+=1900;
        }
        var lat1 = 7.001417;

        var lng1 = 79.949871;

/*https://smart-breathalyzer-web-app.herokuapp.com/cases/0770443148/?lic=1 0 69 63 50 &veh=WP78905&alco=0.01&lat=7.001417&lng=79.949871*/

        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyDtTmBEx5nZpgrgv6pbHWXwi9ykUot6pfk";

        request(url, function(error, response, body) {

        var jsonContent = JSON.parse(body);
        var status = jsonContent.status;

        if (status === 'OK') {
          if (jsonContent.results.length!=0) {
            var place = jsonContent.results[0].formatted_address;
            var address = jsonContent.results[0].address_components; // get the province
            var prov;

            for (var i = 0; i < address.length; i++) {
              var type = address[i].types[0];
              if (type=="administrative_area_level_1") {
                var prov = address[i].short_name;
                break;
              }
            }

            new Case({
                license_id :lic,
                vehicle_num: veh,
                alco_level: alco,
                location: {
                  place:place,
                  province:prov,
                  latitude:lat,
                  longitude:lng
                },
                device_id:devID,
                current_date:{
                  year:year,
                  month:month,
                  date:date
                },
                status:0
          }).save(function(err,results){
            assert.equal(null,error);
          });

            ///res.send("["+nic+","+veh+","+alco+","+lat+","+lng+","+place+"]");

          } else {
            //res.send('No results found');
          }
        } else {
          //res.send('Geocoder failed due to: ' + status);
        }
        });
      }
  });
res.redirect('/cases');
});

  router.get('/delete/:caseID', function(req, res, next) {
  let query = {_id:req.params.caseID};
  Case.remove(query,function(err,docs){
    if (err) {
      console.log(err);
    }
    res.redirect('/cases');
  });

});

router.get('/file/:caseID', function(req, res, next) {
var caseID = req.params.caseID;
Case.findOne({'_id':caseID},function(err,cas) {
let newcase = cas;
newcase.status = 1;
let query = {_id:req.params.caseID};
Case.update(query,newcase,function(err1){
  if (err1) {
    console.log(err1);
  }
  res.redirect('/cases');
});
});

});

function generatePlaneTxt(cipher) {
    var stream = cipher.split(" ");
    var out = "";
    // length-1 to remove the last character (A)
    for (var i = 0; i < stream.length-1; i++) {
      out  = out.concat(characterTable[decrypt(stream[i],13,77)]);
    }
    return out;
}

function decrypt(c, d, N) {
   var r,i=0,prod=1,rem_mod=0;
   while (d>0){
      r=d % 2;
      if (i++==0)
         rem_mod=c % N;
      else
         rem_mod=Math.pow(rem_mod,2) % N;
      if (r==1){
         prod*=rem_mod;
         prod=prod % N;
      }
      d=parseInt(d/2);
   }
   return prod;
}

module.exports = router;
