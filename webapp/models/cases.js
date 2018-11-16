var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  license_id: String,
  vehicle_num: String,
  alco_level: Number,
  location: {
    place : String,
    province : String,
    latitude: Number,
    longitude: Number
  },
  device_id:String,
  current_date:{
    year:Number,
    month:Number,
    date:Number
  },
  status:Number
});

module.exports = mongoose.model('Cases', dataSchema);
