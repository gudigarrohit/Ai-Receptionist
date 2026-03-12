const express = require("express");
const router = express.Router();

const Doctor = require("../models/doctor");
const Appointment = require("../models/Appointment");

/* ===============================
GET ALL DOCTORS
Used for department + doctor dropdown
================================ */
router.get("/doctors", async (req,res)=>{

try{

const doctors = await Doctor.find();

res.json(doctors);

}catch(err){

res.status(500).json({message:"Server error"});

}

});

router.get("/appointments", async (req, res) => {

  try {

    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});
/* ===============================
BOOK APPOINTMENT FROM REACT UI
================================ */
router.post("/appointments", async (req,res)=>{

try{

const {name,age,phone,doctor,problem,date,department,description} = req.body;

if(!name || !age || !phone || !doctor || !date || !department||!problem){
return res.status(400).json({message:"Missing fields"});
}

const appointment = new Appointment({
name,
age,
phone,
doctor,
problem,
date,
department,
description 
});

await appointment.save();

res.json({
message:"Appointment booked",
appointment
});

}catch(err){

console.error(err);

res.status(500).json({message:"Server error"});

}

});

/* ===============================
GET APPOINTMENTS BY DOCTOR
Doctor dashboard table
================================ */
router.get("/appointments/:doctor", async (req,res)=>{

try{

const doctorName = req.params.doctor;

const appointments = await Appointment.find({
doctor:{ $regex: doctorName, $options:"i" }
}).sort({date:1});

res.json(appointments);

}catch(err){

res.status(500).json({message:"Server error"});

}

});

router.get("/appointments/doctor/:doctor", async (req, res) => {

  try {

    const doctorName = req.params.doctor;

    const appointments = await Appointment.find({
      doctor: { $regex: doctorName, $options: "i" }
    }).sort({ date: 1 });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});

/* ===============================
CANCEL APPOINTMENT
================================ */

router.delete("/appointments/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.json({
      message: "Appointment deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* ===============================
UPDATE APPOINTMENT
================================ */
router.put("/appointments/:id", async (req,res)=>{

try{

const appointment = await Appointment.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(appointment);

}catch(err){

res.status(500).json({message:"Update failed"});

}

});

module.exports = router;
