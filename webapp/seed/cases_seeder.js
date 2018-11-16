var Case = require('../models/filed_cases');
var mongoose = require('mongoose');

var uri = 'mongodb://admin:12345@ds257848.mlab.com:57848/breathalyzer_db'
mongoose.connect(uri);

var cases = [
  new Case({
    person_nic :'940272645v',
    vehicle_num: 'WF58413',
    alco_level: 70,
    location: {
      place:'Kuliyapitiya',
      latitude:45.512,
      longitude:-78.51541
    }
  }),
  new Case({
    person_nic :'944822645v',
    vehicle_num: 'AQ5413',
    alco_level: 50,
    location: {
      place:'Kuliyapitiya',
      latitude:45.512,
      longitude:-78.51541
    }
  })
];
var done = 0;
for(var i=0;i<cases.length;i++){

    cases[i].save(function(err,results){
      done++;
      if(done==cases.length){
        exit();
      }
    });
}
function exit(){
  mongoose.disconnect();
}
