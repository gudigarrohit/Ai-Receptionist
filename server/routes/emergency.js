const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");

router.post("/emergency-appointment", async (req, res) => {

  try {

    // Support both VAPI and Postman
    const args = req.body?.message?.toolCalls
      ? req.body.message.toolCalls[0].function.arguments
      : req.body;

    const { name, problem, doctor, department, date } = args;

    if (!name || !problem || !doctor || !department || !date) {
      return res.status(400).json({
        message: "Missing required emergency appointment fields"
      });
    }

    const appointment = new Appointment({
      name,
      doctor,
      department,
      problem,
      description: "Emergency appointment created automatically by AI assistant",
      date: new Date(date),
      emergency: true
    });

    await appointment.save();

    return res.json({
      message: "Emergency appointment booked successfully",
      appointment
    });

  } catch (error) {

    console.error("Emergency booking error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* ===============================
GET EMERGENCY APPOINTMENTS
Used by admin + receptionist dashboards
================================ */

router.get("/emergency-appointments-get", async (req, res) => {

  try {

    const appointments = await Appointment
      .find({ emergency: true })
      .sort({ date: -1 });

    if (appointments.length === 0) {
      return res.json({
        message: "No emergency appointments",
        data: []
      });
    }

    res.json(appointments);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


/*
GET EMERGENCY APPOINTMENTS FOR DOCTOR
*/

router.get("/doctor/:doctorName", async (req, res) => {

  try {

    const doctorName = req.params.doctorName;

    const emergencies = await Appointment.find({
      doctor: doctorName,
      emergency: true
    }).sort({ date: -1 });

    res.json(emergencies);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;

