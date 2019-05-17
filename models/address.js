var mongoose = require("mongoose");

var addressSchema = mongoose.Schema({
    addressLine1: String,
    addressLine2: String,
    landmark: String,
    city: String,
    state: String, //dropdown options
    country: String, //dropdown 
    pin: Number
});

module.exports = mongoose.model("Address", addressSchema);