var express = require('express');
var request = require("request");
var mongoose = require('mongoose');
var assert = require('assert');
var router = express.Router();

var Case = require('../models/cases');
var Device = require('../models/devices');

var array = {
  "CP":0,"DCP":0,
  "EP":0,"DEP":0,
  "NC":0,"DNC":0,
  "NP":0,"DNP":0,
  "NW":0,"DNW":0,
  "SG":0,"DSG":0,
  "SP":0,"DSP":0,
  "UP":0,"DUP":0,
  "WP":0,"DWP":0,
};

router.get('/', function(req, res, next) {

  // first initialize all the variables
  array.CP=0;
  array.EP=0;
  array.NC=0;
  array.NP=0;
  array.NW=0;
  array.SG=0;
  array.SP=0;
  array.UP=0;
  array.WP=0;

  array.DCP=0;
  array.DEP=0;
  array.DNC=0;
  array.DNP=0;
  array.DNW=0;
  array.DSG=0;
  array.DSP=0;
  array.DUP=0;
  array.DWP=0;


  Case.find(function(err,docsCases){

      var dataChunks = [];
      var chunkSize = 4;

      // // decrypt the all the comming data from the database
      // // (only the license id)
      //     for(var i=0;i<docsCases.length;i++){
      //         docsCases[i].license_id = generatePlaneTxt(docsCases[i].license_id);
      //     }

    for(var i=0;i<docsCases.length;i++){

      dataChunks.push(docsCases.slice(i,i+chunkSize));
      var prov = docsCases[i].location.province;
      var alco = docsCases[i].alco_level;
      switch (prov) {
        case "CP":
          array.CP++;
          if (isDrunken(alco)) {
            array.DCP++;
          }

          break;
        case "EP":
          array.EP++;
          if (isDrunken(alco)) {
            array.DEP++;
          }
          break;
        case "NC":
          array.NC++;
          if (isDrunken(alco)) {
            array.DNC++;
          }
          break;
        case "NP":
          array.NP++;
          if (isDrunken(alco)) {
            array.DNP++;
          }
          break;
        case "NW":
          array.NW++;
          if (isDrunken(alco)) {
            array.DNW++;
          }
          break;
        case "SG":
          array.SG++;
          if (isDrunken(alco)) {
            array.DSG++;
          }
          break;
        case "SP":
          array.SP++;
          if (isDrunken(alco)) {
            array.DSP++;
          }
          break;
        case "UP":
          array.UP++;
          if (isDrunken(alco)) {
            array.DUP++;
          }
          break;
        case "WP":
          array.WP++;
          if (isDrunken(alco)) {
            array.DWP++;
          }
          break;
        default:
          break;
      }


    }

    res.render('geoview/index',{title:'SmartBreathalyZ | Province-Analysis',topic:'Province Wise Analysis',
    sub_topic:'fa-map-marker',province:array,cases:dataChunks});

  });


});

function isDrunken(alco) {
  if(alco >=0.08){
    return true;
  }else{
    return false;
  }
}

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
