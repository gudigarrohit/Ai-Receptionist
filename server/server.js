require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const appointmentRouter = require("./routes/appointmentRouter");
const doctorRouter = require("./routes/doctorRouter");
const appointmentUIRouter = require("./routes/appointmentUIRouter");
const doctorUiRouter = require("./routes/doctorUi Route");
const receptionistRoute = require("./routes/receptionistRoute");
const adminRoutes = require("./routes/adminRoute");
const patientRoute = require("./routes/patientRoute");

const app = express();


app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // optional but good
/* ================================
   DEBUG LOGGER
================================ */
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  console.log("Raw body:", req.body);
  next();
});

/* ================================
   MONGODB CONNECTION
================================ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected DB:", mongoose.connection.name);
    console.log("Mongo Host:", mongoose.connection.host);
    console.log("Mongo Port:", mongoose.connection.port);
  })
  .catch(err => {
    console.error("Mongo connection error:", err);
  });

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected!");
});

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});
app.use("/api/appointments", appointmentRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/ui", appointmentUIRouter);
app.use("/api/ui/doctors", doctorUiRouter);
app.use("/api/receptionists", receptionistRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/patient", patientRoute);

app.use((req, res, next) => {
  console.log("INCOMING:", req.method, req.url);
  next();
});
app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000/");
});