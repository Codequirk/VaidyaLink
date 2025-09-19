import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelection from "./pages/RoleSelection";
import PatientAuth from "./pages/PatientAuth";
import DoctorRegister from "./pages/DoctorRegister";
import PatientDashboard from "./pages/PatientDashboard";
import AddReport from "./pages/AddReport";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/role" element={<RoleSelection />} />
        <Route path="/patient" element={<PatientAuth />} />
        <Route path="/doctor" element={<DoctorRegister />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/add-report" element={<AddReport />} />
      </Routes>
      <Footer />
    </Router>
  );
}
