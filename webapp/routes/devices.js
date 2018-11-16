var express = require('express');
var request = require("request");
var mongoose = require('mongoose');
var assert = require('assert');

var router = express.Router();


var Device = require('../models/devices');

router.get('/', function(req, res, next) {
  Device.find(function(err,docs){
    var dataChunks = [];
    var chunkSize = 4;
    for(var i=0;i<docs.length;i+=chunkSize){
      dataChunks.push(docs.slice(i,i+chunkSize));
    }
    res.render('devices/index',{title:'SmartBreathalyZ | Devices',topic:'Registered Devices',
    sub_topic:'fa-mobile',devices : dataChunks});

  });

});

router.get('/create', function(req, res, next) {

  res.render('devices/create',{title:'SmartBreathalyZ | Device_Registration',topic:'Device Registration',
  sub_topic:'fa-mobile',success:false,errors:false});

});


router.post('/create', function(req, res, next) {


  Device.findOne({'device_id':req.body.dev_id},function(err,device) {
      if(err){
        //
      }
      if(device){
        res.render('devices/create',{title:'SmartBreathalyZ | Device_Registration',topic:'Device Registration',
        sub_topic:'fa-mobile',success:false,errors:true,device:req.body.dev_id});
      }else{
        new Device({
          device_id: req.body.dev_id,
          police_station_id:req.body.police

        }).save(function(err,results){
            assert.equal(null,err);
        });
        res.render('devices/create',{title:'SmartBreathalyZ | Device_Registration',topic:'Device Registration',
        sub_topic:'fa-mobile',success:true,errors:false,device:req.body.dev_id});
      }
  });

});

module.exports = router;
