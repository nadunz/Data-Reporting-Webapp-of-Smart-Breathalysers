var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  device_id: String,
  police_station_id:String
});

module.exports = mongoose.model('Devices', dataSchema);
