import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";
import CustomButton from "../SharedComponents/CustomButton";
import { BASE_URL } from "../../utils/baseUrl";
import toast from "react-hot-toast";

const SellerPolicy = ({ initialPolicy }) => {
  const [policy, setPolicy] = useState(initialPolicy);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPolicy(initialPolicy);
  }, [initialPolicy]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication error. Please log in again.");
      return;
    }
  
    if (policy === initialPolicy) {
      toast.info("No changes detected.");
      setIsEditing(false);
      return;
    }
  
    try {
      setLoading(true);
      toast.loading("Updating Seller Policy...");
  
      const response = await fetch(`${BASE_URL}/api/vendor/update-details`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          sellerPolicy: policy 
        }),
      });
  
      const data = await response.json();
      toast.dismiss();
  
      if (response.ok) {
        toast.success("Seller policy updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(data.message || "Failed to update policy");
        console.error("Update error:", data);
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong! Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <h2>Seller Policy</h2>
      <ReactQuill
        value={policy}
        onChange={setPolicy}
        readOnly={!isEditing}
        style={{ height: "300px", background: isEditing ? "white" : "#f5f5f5" }}
      />

      <Box
        sx={{
          textAlign: "right",
          marginTop: "70px",
          display: "flex",
          gap: "20px",
        }}
      >
        {!isEditing ? (
          <CustomButton
            label="Edit"
            icon={<ModeEditIcon sx={{ marginRight: "8px" }} />}
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <>
            <CustomButton
              label={loading ? "Saving..." : "Save"}
              icon={<SaveIcon sx={{ marginRight: "8px" }} />}
              onClick={handleSave}
              disabled={loading}
            />
            <CustomButton
              label="Cancel"
              variant="outlined"
              onClick={() => {
                setPolicy(initialPolicy);
                setIsEditing(false);
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default SellerPolicy;
