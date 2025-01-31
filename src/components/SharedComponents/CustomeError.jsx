import React from "react";
import { motion } from "framer-motion";

const CustomeError = ({error}) => {
  return (
    <motion.div
      style={{
        background: "rgba(255, 0, 0, 0.1)",
        color: "#ff6b6b",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1.5rem",
        fontSize: "0.9rem",
        textAlign: "center",
        border: "1px solid rgba(255, 0, 0, 0.2)",
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {error}
    </motion.div>
  );
};

export default CustomeError;
