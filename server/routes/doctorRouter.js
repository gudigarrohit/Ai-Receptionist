const express = require("express");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/doctor");

const router = express.Router();



// REGISTER
router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingDoctor = await Doctor.findOne({ email });

        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = new Doctor({
            name,
            email,
            password: hashedPassword
        });

        await doctor.save();

        res.json({
            message: "Doctor account created successfully"
        });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: err.message });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    console.log("STEP 1: Login request received");
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    console.log("STEP 2: Searching doctor");

    const doctor = await Doctor.findOne({ email });

    console.log("STEP 3: Doctor found:", doctor);

    if (!doctor) {
      console.log("Doctor not found");
      return res.status(400).json({ message: "Doctor not found" });
    }

    console.log("STEP 4: Comparing password");

    const match = await bcrypt.compare(password, doctor.password);

    console.log("STEP 5: Password match result:", match);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("STEP 6: Login success");

    res.json({
      message: "Login successful",
      doctor
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });

  }

});


// GET DOCTOR PROFILE
router.get("/:id", async (req, res) => {

    try {

        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(doctor);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server error" });

    }

});


// UPDATE DOCTOR PROFILE
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
    res.status(500).json({ message: "Update failed" });

  }

});


module.exports = router;