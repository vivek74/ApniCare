var mongoose = require("mongoose");

var myMedicineSchema = mongoose.Schema({
    medicineName: String,
    created: { type: Date },
    qty: {type: Number},
    manufacturarName: String,
    mrp: Number
});

module.exports = mongoose.model("myMedicine", myMedicineSchema);