const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Appointment = require("../models/Appointment");

/* =====================================================
   HELPER: SEND RESPONSE TO VAPI
===================================================== */
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

/* =====================================================
   CHECK DOCTOR AVAILABILITY
===================================================== */
router.post("/check-availability", async (req, res) => {

  try {

    const args = extractArgs(req);

    if (!args?.doctor || !args?.date) {
      return sendToolResult(req, res, "Doctor and date required");
    }

    const requestedDate = new Date(args.date);
    const now = new Date();

    if (requestedDate.getTime() < now.getTime() - 60000) {
      return sendToolResult(req, res, "Cannot book in the past");
    }

    const hour = new Date(args.date).getHours();

    const [year, month, dayNum] = args.date.substring(0, 10).split("-");
    const day = new Date(year, month - 1, dayNum).getDay();

    const cleanedName = args.doctor
      .replace(/^doctor\s+/i, "")
      .replace(/^dr\.?\s+/i, "")
      .trim();

    const doctorData = await Doctor.findOne({
      name: {
        $regex: `^(Dr\\.?\\s*)?${cleanedName}$`,
        $options: "i"
      }
    });

    if (!doctorData) {
      return sendToolResult(req, res, "Doctor not found");
    }

    if (day === 0) {

      const sundayStart = parseInt(doctorData.sundayStart.split(":")[0]);
      const sundayEnd = parseInt(doctorData.sundayEnd.split(":")[0]);

      if (hour < sundayStart || hour >= sundayEnd) {
        return sendToolResult(req, res, "Doctor not available at this Sunday time");
      }

    } else {

      const startHour = parseInt(doctorData.dutyStart.split(":")[0]);
      const endHour = parseInt(doctorData.dutyEnd.split(":")[0]);

      if (hour < startHour || hour >= endHour) {
        return sendToolResult(req, res, "Doctor not on duty at this time");
      }

    }

    const lunchStart = parseInt(doctorData.lunchStart.split(":")[0]);
    const lunchEnd = parseInt(doctorData.lunchEnd.split(":")[0]);

    if (hour >= lunchStart && hour < lunchEnd) {
      return sendToolResult(req, res, "Doctor is on lunch break");
    }

    const isOnLeave = doctorData.leaves?.some(
      leave =>
        new Date(leave).toDateString() ===
        new Date(year, month - 1, dayNum).toDateString()
    );

    if (isOnLeave) {
      return sendToolResult(req, res, "Doctor is on leave");
    }

    const slotStart = new Date(args.date);
    const slotEnd = new Date(args.date);
    slotEnd.setMinutes(slotEnd.getMinutes() + doctorData.slotDuration);

    const count = await Appointment.countDocuments({
      doctor: { $regex: `^(Dr\\.?\\s*)?${cleanedName}$`, $options: "i" },
      date: { $gte: slotStart, $lt: slotEnd }
    });

    if (count >= doctorData.maxPatientsPerSlot) {
      return sendToolResult(req, res, "Slot full");
    }

    return sendToolResult(req, res, "Doctor available");

  } catch (err) {

    console.error("Availability error:", err);

    return sendToolResult(req, res, err.message, true);
  }

});

/* =====================================================
   BOOK APPOINTMENT
===================================================== */
router.post("/book", async (req, res) => {

  try {

    const args = extractArgs(req);

    if (!args?.name || !args?.age || !args?.doctor || !args?.phone || !args?.date || !args?.department || !args?.description) {
      return sendToolResult(req, res, "Missing required fields");
    }

    const requestedDate = new Date(args.date);

    if (requestedDate <= new Date()) {
      return sendToolResult(req, res, "Cannot book in the past");
    }

    const cleanedName = args.doctor.replace(/^dr\.?\s*/i, "").trim();

    const doctorData = await Doctor.findOne({
      name: { $regex: cleanedName, $options: "i" }
    });

    if (!doctorData) {
      return sendToolResult(req, res, "Doctor not found");
    }

    const appointment = new Appointment({
      name: args.name,
      age: Number(args.age),
      doctor: doctorData.name,
      problem: args.problem || "",
      phone: args.phone,
      department: args.department,
      description: args.description || "",
      date: requestedDate
    });

    await appointment.save();

    return sendToolResult(req, res, "Appointment booked successfully");

  } catch (err) {

    console.error(err);

    return sendToolResult(req, res, err.message, true);

  }

});

/* =====================================================
   CANCEL APPOINTMENT
===================================================== */
router.post("/cancel", async (req, res) => {

  try {

    const args = extractArgs(req);

    const deleted = await Appointment.findOneAndDelete({
      phone: args.phone,
      doctor: args.doctor,
      date: new Date(args.date)
    });

    if (!deleted) {
      return sendToolResult(req, res, "Appointment not found");
    }

    return sendToolResult(req, res, "Appointment cancelled successfully");

  } catch (err) {

    return sendToolResult(req, res, err.message, true);

  }

});

/* =====================================================
   RESCHEDULE APPOINTMENT
===================================================== */
router.post("/reschedule", async (req, res) => {

  try {

    const args = extractArgs(req);

    const appointment = await Appointment.findOne({
      phone: args.phone,
      doctor: args.doctor,
      date: new Date(args.oldDate)
    });

    if (!appointment) {
      return sendToolResult(req, res, "Original appointment not found");
    }

    const newDate = new Date(args.newDate);

    if (newDate <= new Date()) {
      return sendToolResult(req, res, "Cannot reschedule to past date");
    }

    appointment.date = newDate;

    await appointment.save();

    return sendToolResult(req, res, "Appointment rescheduled successfully");

  } catch (err) {

    return sendToolResult(req, res, err.message, true);

  }

});


module.exports = router;