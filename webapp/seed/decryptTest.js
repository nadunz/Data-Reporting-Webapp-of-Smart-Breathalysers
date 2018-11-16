var express = require('express');
var request = require("request");
var mongoose = require('mongoose');
var assert = require('assert');


var characterTable = ["A", "B", "C","D", "E", "F","G", "H", "I","J", "K", "L","M", "N", "O","P", "Q", "R","S", "T", "U","V","W","X","Y","Z",
                      "0","1","2","3","4","5","6","7","8","9"
                      ];
var plain = generatePlaneTxt("0 ");
console.log(plain);

function generatePlaneTxt(cipher) {
    var stream = cipher.split(" ");
    var out = "";
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
