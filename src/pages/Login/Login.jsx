import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "./Login.css";
import signinImage from "../../assets/signin.avif";
import { BASE_URL } from "../../utils/baseUrl";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && navigate("/");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/vendor/login`, {
        email,
        password,
      });

      // Handle success
      const { token, vendor } = response.data;
      console.log("Login successful:", vendor);

      // Store the token (e.g., in localStorage)
      localStorage.setItem("token", token);

      // Redirect to vendor dashboard or another page
      navigate("/sellers");
    } catch (err) {
      // Handle errors
      const message =
        err.response?.data?.message || "An error occurred during login.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forget-pwd");
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="auth-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="auth-left">
          <motion.img
            src={signinImage}
            alt="Sign In"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="auth-right">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sign In
          </motion.h2>

          {error && <div className="error-message">{error}</div>}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleLogin}
          >
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "CONTINUE"}
            </motion.button>

            <div
              className="forgot-password"
              onClick={handleForgotPassword}
              style={{ cursor: "pointer", color: "#0072ff", marginTop: "10px" }}
            >
              Forget Password?
            </div>
          </motion.form>

          <motion.div
            className="auth-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={handleSignUp}>
                Sign Up
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
