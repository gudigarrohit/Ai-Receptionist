const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: false
  },
  name: String,
  age: Number,
  department: String,
  doctor: String,
  problem: String,
  date: Date,
  phone: String,
  
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Appointment", AppointmentSchema);