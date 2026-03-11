const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");


/* =========================
GET ALL DOCTORS
========================= */

router.get("/", async (req, res) => {

  try {

    const doctors = await Doctor.find().sort({ name: 1 })
    
    ;

    res.json(doctors);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* =========================
CREATE DOCTOR
========================= */

router.post("/", async (req, res) => {

  try {

    const doctor = new Doctor(req.body);

    await doctor.save();

    res.json(doctor);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to add doctor"
    });

  }

});


/* =========================
UPDATE DOCTOR
========================= */

router.put("/:id", async (req, res) => {

  try {

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(doctor);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Update failed"
    });

  }

});


/* =========================
DELETE DOCTOR
========================= */

router.delete("/:id", async (req, res) => {

  try {

    await Doctor.findByIdAndDelete(req.params.id);

    res.json({
      message: "Doctor deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Delete failed"
    });

  }

});


module.exports = router;