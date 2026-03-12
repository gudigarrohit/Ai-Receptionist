const mongoose = require("mongoose");

const receptionistSchema = new mongoose.Schema({

   name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String
  },

  password: {
    type: String,
    required: true
  },

  address: String,

  gender: String,

  shift: String

},
{ timestamps: true });

module.exports = mongoose.model("Receptionist", receptionistSchema);