const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
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