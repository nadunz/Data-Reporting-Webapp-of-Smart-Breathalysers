var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  person_nic: String,
  vehicle_num: String,
  alco_level: Number,
  location: {
    place : String,
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model('Cases', dataSchema);
