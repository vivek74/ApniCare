var mongoose = require("mongoose");

var manufactureSchema = mongoose.Schema({
		name: String,
	    list: 
	     [
	      {
	         items: String
	      }
		]
		},
	{
		usePushEach: true
});

module.exports = mongoose.model("Manufacture", manufactureSchema);