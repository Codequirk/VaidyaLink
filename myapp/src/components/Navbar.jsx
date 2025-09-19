import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>🏥 HealthConnect</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/role">Get Started</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
