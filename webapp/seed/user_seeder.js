var User = require('../models/users');
var mongoose = require('mongoose');

var uri = 'mongodb://admin:12345@ds257848.mlab.com:57848/breathalyzer_db'
mongoose.connect(uri);

var users = [
  new User({
    username :'admin',
    password: '12345',

  })

];
var done = 0;
for(var i=0;i<users.length;i++){

    users[i].save(function(err,results){
      done++;
      if(done==users.length){
        exit();
      }
    });
}
function exit(){
  mongoose.disconnect();
}
