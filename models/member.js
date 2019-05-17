var mongoose = require("mongoose");

var memberSchema = mongoose.Schema({
    name: String,
    created: { type: Date },
    relation: String,
    image: String
});

module.exports = mongoose.model("Member", memberSchema);