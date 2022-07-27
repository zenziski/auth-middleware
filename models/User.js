const mongoose = require("mongoose");

const schema = mongoose.Schema({
   name: String,
   username: {type: String, unique: true},
   password: String,
   access_level: String
},
{ versionKey: false }
);

module.exports = mongoose.model("users", schema);