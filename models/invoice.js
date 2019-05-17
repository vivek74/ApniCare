var mongoose = require("mongoose");

var invoiceSchema = mongoose.Schema({
    invoiceId: String,//10digit auto generated
    image: String,
    patientName: String,
    relation: String, //optional
    invoiceDate: { type: Date }
});

module.exports = mongoose.model("Invoice", invoiceSchema);