const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");

function sendToolResult(req, res, text, isError = false) {

  const toolCallId =
    req.body?.message?.toolCalls?.[0]?.id ||
    req.body?.toolCallId ||
    "call_1";

  return res.json({
    results: [
      isError
        ? { toolCallId, error: text }
        : { toolCallId, result: text }
    ]
  });
}

/* =====================================================
   HELPER: EXTRACT TOOL ARGUMENTS
===================================================== */
function extractArgs(req) {

  if (req.body && typeof req.body === "object" && Object.keys(req.body).length > 0) {
    if (!req.body.message) return req.body;
  }

  const message = req.body?.message;
  if (!message) return null;

  const toolCall =
    message.toolCalls?.[0] ||
    message.toolCallList?.[0] ||
    message.toolWithToolCallList?.[0];

  if (!toolCall) return null;

  let args =
    toolCall.function?.arguments ||
    toolCall.arguments;

  if (!args) return null;

  if (typeof args === "string") {
    try {
      args = JSON.parse(args);
    } catch (err) {
      console.error("JSON parse failed:", err);
      return null;
    }
  }

  return args;
}
router.post("/emergency-appointment", async (req, res) => {

  try {

    // Support both VAPI and Postman
    const args = req.body?.message?.toolCalls
      ? req.body.message.toolCalls[0].function.arguments
      : req.body;

    const { name, problem, doctor, department, date } = args;

    if (!name || !problem || !doctor || !department || !date) {
    return sendToolResult(req, res, "Missing required emergency appointment fields");
      
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
  return sendToolResult(req, res, "Emergency appointment booked successfully");

  } catch (error) {

      return sendToolResult(req, res,"Emergency booking error:" + error.message, true);

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

