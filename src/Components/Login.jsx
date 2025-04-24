import React, { useState } from "react";
import { db } from "../Firebase"; // Ensure Firebase is properly configured
import { doc, getDoc } from "firebase/firestore";

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const userRef = doc(db, "users", userId.trim());
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("User ID not found.");
        return;
      }

      const data = userSnap.data();
      if (data.dob !== dob) {
        setError("Invalid date of birth.");
        return;
      }

      if (data.hasVoted) {
        setError("You have already voted.");
        return;
      }

      onLogin(userId); // Proceed with login
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login to Vote</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={styles.input}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "#d9534f",
    marginTop: "10px",
  },
};

export default Login;
