
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";




const PatientAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    pincode: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isLogin) {
    try {
      const res = await fetch("http://localhost:5000/api/patient/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login successful:", data);
        // Optionally store token or user info
        // localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        console.error("Login failed:", data.message);
        alert("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again later.");
    }
  } else {
    try {
      const res = await fetch("http://localhost:5000/api/patient/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Registered:", data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? "Patient Login" : "Patient Registration"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Registration extra fields */}
          {!isLogin && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                value={formData.age}
                onChange={handleChange}
                required
                min={1}
                max={120}
                style={styles.input} 
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={{
                  ...styles.input,
                  color: '#00000086',
                  backgroundColor: 'white',
                }}
              >  
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="bloodGroup"
                placeholder="Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
                style={styles.input}
              />
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </>
          )}

          {/* Common fields for both login & register */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            style={styles.toggle}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
    padding: "20px",
    boxSizing: "border-box",
  },
  
  card: {
    background: "#ffffff",
    padding: "2.5rem",
    borderRadius: "10px",
    boxShadow: "0 6px 20px rgba(116, 225, 108, 0.83)",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#00796b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  
  },
  input: {
    backgroundColor: "#fff",
    color:"#000",
    padding: "0.8rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    width: "100%",               
    boxSizing: "border-box",
  },
  button: {
    padding: "0.9rem",
    background: "#00796b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
    width: "100%",
  },
  toggleText: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "0.95rem",
    color: "#00796b",
  },
  toggleLink: {
    color: "#00796b",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default PatientAuth;
