var mongoose = require("mongoose");

var recordSchema = mongoose.Schema({
    recordId: String,//10digit auto generated
    image: String,
    patientName: String,
    relation: String, //optional
    recordDate: { type: Date },
    phoneNumber: String
});

module.exports = mongoose.model("Record", recordSchema);