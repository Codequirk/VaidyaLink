import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from 'react-qr-code';
import "./Dashboard.css";

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with actual fetch logic
    const fetchPatient = async () => {
      const res = await fetch("http://localhost:5000/api/patient/pragnamp15@gmail.com");
      const data = await res.json();
      setPatient(data);
    };
    fetchPatient();
  }, []);

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {patient.fullName}</h2>
        <button className="add-report-btn" onClick={() => navigate("/add-report")}>
          Add Reports
        </button>
      </div>

      <div className="dashboard-content">
        <div className="patient-info">
          <p><strong>Role:</strong> Patient</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Age & Gender:</strong> {patient.age} years, {patient.gender}</p>
          <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>PIN:</strong> {patient.pincode}</p>
          <p><strong>Member since:</strong> 7/9/2025</p>
          <p><strong>Unique ID:</strong> {patient.uniqueId}</p>
        </div>

       
      </div>
    </div>
  );
}
