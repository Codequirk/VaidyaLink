import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Your Health, Our Priority</h1>
      <p>Experience the future of healthcare with our digital platform for patients and doctors.</p>
      <div className="home-buttons">
        <Link to="/role" className="btn-primary">Get Started Today</Link>
        <Link to="/about" className="btn-secondary">Learn More</Link>
      </div>
    </div>
  );
}
