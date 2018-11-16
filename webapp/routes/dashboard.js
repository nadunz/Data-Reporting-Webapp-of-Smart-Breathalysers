var express = require('express');
var request = require("request");
var mongoose = require('mongoose');
var assert = require('assert');
var csrf = require('csurf');
var csrfPrtection = csrf();

var router = express.Router();

var Case = require('../models/cases');
var Device = require('../models/devices');
var User = require('../models/users');

var array = {
  "jan":0,
  "feb":0,
  "mar":0,
  "apr":0,
  "may":0,
  "jun":0,
  "jul":0,
  "aug":0,
  "sep":0,
  "oct":0,
  "nov":0,
  "dec":0
};

var donut = {
  "notDrn":0,
  "Drn":0,

};


router.get('/dashboard', function(req, res, next) {
// first initialize all the variables
array.jan=0;
array.feb=0;
array.mar=0;
array.apr=0;
array.may=0;
array.jun=0;
array.jul=0;
array.aug=0;
array.sep=0;
array.oct=0;
array.nov=0;
array.dec=0;

donut.notDrn=0;
donut.Drn=0;


  Case.count(function(err1,docs1){

    Device.count(function(err2,docs){

      Case.find(function(err,docsCases){

        for(var i=0;i<docsCases.length;i++){
          var month = docsCases[i].current_date.month;
          switch (month) {
            case 1:
              array.jan++;
              break;
            case 2:
              array.feb++;
              break;
            case 3:
              array.mar++;
              break;
            case 4:
              array.apr++;
              break;
            case 5:
              array.may++;
              break;
            case 6:
              array.jun++;
              break;
            case 7:
              array.jul++;
              break;
            case 8:
              array.aug++;
              break;
            case 9:
              array.sep++;
              break;
            case 10:
              array.oct++;
              break;
            case 11:
              array.nov++;
              break;
            case 12:
              array.dec++;
              break;
            default:
              break;
          }
          var alco = docsCases[i].alco_level;

          if(alco >=0.08){
            donut.Drn++;
          }else{
            donut.notDrn++;
          }

        }
        if(docs1!=0){
          donut.Drn/=docs1;
          donut.notDrn/=docs1;


          donut.Drn = roundToTwo(donut.Drn*=100);
          donut.notDrn = roundToTwo(donut.notDrn*=100);

        }

        res.render('home/dashboard',{title:'SmartBreathalyZ | dashboard',topic:'Dashboard',
        sub_topic:'fa-home', cases_count : docs1, devices_count : docs, graphData:array,doughnutData:donut});

      });

    });
  });

});

router.post('/dashboard', function(req, res, next) {
// first initialize all the variables
array.jan=0;
array.feb=0;
array.mar=0;
array.apr=0;
array.may=0;
array.jun=0;
array.jul=0;
array.aug=0;
array.sep=0;
array.oct=0;
array.nov=0;
array.dec=0;

donut.Drn=0;
donut.notDrn=0;


User.findOne({'username':req.body.username,'password':req.body.pass},function(e,user){

  ///
  if(e){
//
  }
  if(!user){
      res.render('user/login',{layout:null,csrfToken:req.csrfToken,error:"Password or username is incorrect"});
  }else{
  Case.count(function(err1,docs1){

    Device.count(function(err2,docs){

      Case.find(function(err,docsCases){

        for(var i=0;i<docsCases.length;i++){
          var month = docsCases[i].current_date.month;
          switch (month) {
            case 1:
              array.jan++;
              break;
            case 2:
              array.feb++;
              break;
            case 3:
              array.mar++;
              break;
            case 4:
              array.apr++;
              break;
            case 5:
              array.may++;
              break;
            case 6:
              array.jun++;
              break;
            case 7:
              array.jul++;
              break;
            case 8:
              array.aug++;
              break;
            case 9:
              array.sep++;
              break;
            case 10:
              array.oct++;
              break;
            case 11:
              array.nov++;
              break;
            case 12:
              array.dec++;
              break;
            default:
              break;
          }
          var alco = docsCases[i].alco_level;


                    if(alco >=0.08){
                      donut.Drn++;
                    }else{
                      donut.notDrn++;
                    }

        }
        if(docs1!=0){
          donut.Drn/=docs1;
          donut.notDrn/=docs1;


          donut.Drn = roundToTwo(donut.Drn*=100);
          donut.notDrn = roundToTwo(donut.notDrn*=100);

        }

        res.render('home/dashboard',{title:'SmartBreathalyZ | dashboard',topic:'Dashboard',
        sub_topic:'fa-home', cases_count : docs1, devices_count : docs, graphData:array,doughnutData:donut});

      });

    });
  });

  }
});

});

router.get('/', function(req, res, next) {
  res.render('user/login',{layout:null,csrfToken:req.csrfToken,error:null});
});


function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}



module.exports = router;
