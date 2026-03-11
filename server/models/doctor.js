const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,

  },

  specialization: String,

   experience: {
    type: Number,
    default: 0
  },

  fee: {
    type: Number,
    default: 0
  },
  // Duty hours matching hospital timing
  dutyStart: { type: String, default: "08:00" },
  dutyEnd: { type: String, default: "21:00" },

  sundayStart: { type: String, default: "09:00" },
  sundayEnd: { type: String, default: "14:00" },

  slotDuration: {
    type: Number,
    default: 30
  },

  maxPatientsPerSlot: {
    type: Number,
    default: 2
  },

  workingDays: {
    type: [Number],
    default: [0, 1, 2, 3, 4, 5, 6] // open all days
  },

  lunchStart: { type: String, default: "13:00" },
  lunchEnd: { type: String, default: "14:00" },

  leaves: [{ type: Date }]
});

module.exports = mongoose.model("doctors", doctorSchema);