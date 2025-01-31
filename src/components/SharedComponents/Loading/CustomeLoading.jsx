import { motion } from "framer-motion";
import "./CustomeLoading.css";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="loading-spinner-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <p>Loading...</p>
    </motion.div>
  );
};

export default LoadingSpinner;