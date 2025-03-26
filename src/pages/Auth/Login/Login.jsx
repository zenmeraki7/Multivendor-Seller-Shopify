import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { keyframes } from "@emotion/react"; // Import keyframes from Emotion
import "./Login.css";

import { BASE_URL } from "../../../utils/baseUrl";
import CustomeError from "../../../components/SharedComponents/CustomeError";

// Define the gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function Login() {
  const navigate = useNavigate();
  const { shop } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && navigate("/dashboard");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/vendor/login`, {
        email,
        password,
        shop,
      });

      // Handle success
      const { token, vendor } = response.data;
      console.log("Login successful:", vendor);

      // Store the token (e.g., in localStorage)
      localStorage.setItem("token", token);

      // Redirect to vendor dashboard or another page
      navigate("/dashboard");
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
    navigate(`/auth/${shop}/register`);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate(`/auth/${shop}/forgot-password`);
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background:
          "linear-gradient(-45deg, #f3e5f5, #fff3e0, #f3e5f5, #fff3e0)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 10s ease infinite`,
      }}
    >
      <motion.div
        className="auth-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="auth-left">
          <motion.img
            src="https://cdn.dribbble.com/users/1785628/screenshots/5676620/media/e8349cbaee4a18d613941c2cc7f70129.gif"
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
            Log in to your Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="subtitle"
          >
            Welcome back!
          </motion.p>

          {error && <CustomeError error={error} />}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleLogin}
          >
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
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
              {loading ? "Logging in..." : "Log in"}
            </motion.button>

            <div className="forgot-password" onClick={handleForgotPassword}>
              Forgot Password?
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
                Create an account
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
