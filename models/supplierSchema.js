var mongoose = require("mongoose");

var supplierSchema = new mongoose.Schema({
    supplierName: String,
    city: String,
    contactPersonName: String,
    contactPersonNumber: String,
    supplierNumber: String,
    supplierId: String,
    address: String,
    diNumber: String, //auto unique generated 10 digit number
    expiration: {
        type: Date
    },
    email: String,
    website: String,
    gstNumber: String,
    medicineList: [{
        type: String
}],
    pincode: String
});

module.exports = mongoose.model("Supplier", supplierSchema);
