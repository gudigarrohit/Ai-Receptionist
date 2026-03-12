const express = require("express");
const bcrypt = require("bcryptjs");
const Receptionist = require("../models/receptionist");

const router = express.Router();



/* ===============================
REGISTER RECEPTIONIST
Email + Password only
================================ */

router.post("/register", async (req, res) => {

  try {

    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const existingReceptionist = await Receptionist.findOne({ email });

    if (existingReceptionist) {
      return res.status(400).json({
        message: "Receptionist already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const receptionist = new Receptionist({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await receptionist.save();

    res.json({
      message: "Receptionist account created successfully"
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
LOGIN RECEPTIONIST
================================ */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const receptionist = await Receptionist.findOne({ email });

    if (!receptionist) {
      return res.status(400).json({
        message: "Receptionist not found"
      });
    }

    const match = await bcrypt.compare(password, receptionist.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login successful",
      receptionist
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});



/* ===============================
GET RECEPTIONIST PROFILE
================================ */

router.get("/:id", async (req, res) => {

  try {

    const receptionist = await Receptionist.findById(req.params.id);

    if (!receptionist) {
      return res.status(404).json({
        message: "Receptionist not found"
      });
    }

    res.json(receptionist);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

});



/* ===============================
UPDATE RECEPTIONIST PROFILE
Add name, phone, etc after login
================================ */

router.put("/:id", async (req, res) => {

  try {

    const receptionist = await Receptionist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(receptionist);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Update failed"
    });

  }

});


module.exports = router;