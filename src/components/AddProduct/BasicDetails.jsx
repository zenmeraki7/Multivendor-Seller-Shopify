import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CustomInput from "../SharedComponents/CustomInput";
import ReactQuill from "react-quill";

const BasicDetails = () => {
  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <CustomInput
              name="title"
              id="title"
              label="Product Title"
              placeholder="Enter product title"
            //   value={formData.title}
            //   onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Product Description
        </Typography>
        <ReactQuill
          value={"Somehting"}
          // onChange={setPolicy}
          // readOnly={!isEditing}
          style={{
            height: "180px",
            // background: "#f5f5f5",
          }}
        />
      </Box>
    </>
  );
};

export default BasicDetails;
