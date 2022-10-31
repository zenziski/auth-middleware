const mongoose = require("mongoose");

const schema = mongoose.Schema({
   name: String,
   username: {type: String, unique: true},
   cpf: {type: String, unique: true},
   password: String,
   access_level: {type: String, default: "user"}
},
);

module.exports = mongoose.model("users", schema);