const Patient = require("../models/Patient");

exports.registerPatient = async (req, res) => {
  try {
    const newPatient = new Patient({ ...req.body });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientByEmail = async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.params.email });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (patient.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

