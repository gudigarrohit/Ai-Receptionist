const express = require("express");
const bcrypt = require("bcryptjs");
const Patient = require("../models/Patient");   // changed model
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();


/* ===============================
REGISTER PATIENT
================================ */

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
      return res.status(400).json({
        message: "Patient already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = new Patient({
      name,
      email,
      password: hashedPassword
    });

    await patient.save();

    res.json({
      message: "Patient registered successfully",
      patient
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});


/* ===============================
PATIENT LOGIN
================================ */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(password, patient.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login success",
      patient
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* ===============================
GOOGLE LOGIN
================================ */

router.post("/google-login", async (req, res) => {

  try {

    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Google token missing"
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { email, name, sub } = payload;

    let patient = await Patient.findOne({ email });

    if (!patient) {

      patient = new Patient({
        name,
        email,
        googleId: sub
      });

      await patient.save();

    }

    res.json({
      success: true,
      patient
    });

  } catch (error) {

    console.error("GOOGLE LOGIN ERROR:", error.message);

    res.status(500).json({
      message: "Google authentication failed"
    });

  }

});


/* ===============================
STAFF LOGIN (ACCESS KEY)
================================ */

router.post("/staff-login", async (req, res) => {

  try {

    const { accessKey } = req.body;

    if (accessKey !== process.env.STAFF_ACCESS_KEY) {
      return res.status(401).json({
        message: "Invalid staff key"
      });
    }

    res.json({
      message: "Staff login success"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

});


module.exports = router;