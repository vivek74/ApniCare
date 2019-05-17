var mongoose = require("mongoose");

var prescriptionSchema = mongoose.Schema({
    prescriptionId: String,//10digit auto generated
    created: Date,
    prescriptionImage: String,
    patientName: String,
    doctorName: String,
    medicines: 
    [
      {
         text: String
      }
   	],
     phoneNumber: String,
     relation: String
 },
  {
    usePushEach: true
});

module.exports = mongoose.model("Prescription", prescriptionSchema);