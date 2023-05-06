const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Person = new Schema({
  person_name: { type: String },
  person_place: { type: String },
});

module.exports = mongoose.model("Persons", Person);
