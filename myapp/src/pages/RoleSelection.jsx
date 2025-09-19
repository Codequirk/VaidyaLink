import React from "react";
import { Link } from "react-router-dom";
import "./RoleSelection.css";

export default function RoleSelection() {
  return (
    <div className="role-container">
      <h2 style={{ color: " #2bb673" }}>Choose Your Role</h2>
      <div className="role-cards">
        <div className="role-card">
          <h3>Register as Doctor</h3>
          <p>Manage patients, appointments, and medical records.</p>
          <ul>
            <li>Patient management</li>
            <li>Appointment scheduling</li>
            <li>Medical record access</li>
            <li>Prescription management</li>
          </ul>
          <Link to="/doctor" className="btn-primary">Continue</Link>
        </div>
        <div className="role-card">
          <h3>Register as Patient</h3>
          <p>Access your health records and connect with doctors.</p>
          <ul>
            <li>Personal health records</li>
            <li>Doctor appointments</li>
            <li>Medical history tracking</li>
            <li>Prescription reminders</li>
          </ul>
          <Link to="/patient" className="btn-primary">Continue</Link>
        </div>
      </div>
    </div>
  );
}
