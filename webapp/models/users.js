var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  username: String,
  password:String
});

module.exports = mongoose.model('Users', dataSchema);
