const express = require("express");
const router = express.Router();
const { registerPatient, getPatientByEmail,loginPatient} = require("../../controllers/patientController");

router.post("/register", registerPatient);
router.get("/:email", getPatientByEmail);
router.post("/login", loginPatient); 

module.exports = router;
