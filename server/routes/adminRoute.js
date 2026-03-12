const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

/* ============================
ADMIN LOGIN
============================ */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Admin not found"
      });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login successful",
      admin
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

router.post("/create", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword
    });

    await admin.save();

    res.json({
      message: "Admin created successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

});

router.get("/:id", async (req,res)=>{

  const admin = await Admin.findById(req.params.id);

  res.json(admin);

});

module.exports = router;