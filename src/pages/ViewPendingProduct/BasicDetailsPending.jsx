import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import React from "react";
import CustomInput from "../../components/SharedComponents/CustomInput";
import ReactQuill from "react-quill";

const BasicDetailsPending = ({ handleChange, productData, setProductData }) => {
  const handleChangeQuill = (value) => {
    setProductData({ ...productData, description: value });
  };

  return (
    <>
      <Box >
        <Typography variant="h6" gutterBottom>
          Basic Details
        </Typography>
        
        {!productData ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <CustomInput
                name="title"
                id="title"
                label="Product Title"
                placeholder="Enter product title"
                value={productData.title || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        )}
      </Box>
      
      <Box >
        <Typography variant="subtitle1" gutterBottom>
          Product Description
        </Typography>
        <ReactQuill
          value={productData.description || ""}
          onChange={handleChangeQuill}
          style={{
            height: "200px",
          }}
        />
      </Box>
    </>
  );
};

export default BasicDetailsPending;