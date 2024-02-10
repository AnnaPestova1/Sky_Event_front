import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import SharedAPISingleData from "./SharedAPISingleData";

const SharedAPIData = ({ data }) => {
  return (
    <Box
      component="span"
      p={2}
      sx={{
        display: "flex",

        minWidth: 275
      }}>
      <Grid container spacing={2}>
        {data.map((d, i) => {
          return <SharedAPISingleData key={i} data={d} />;
        })}
      </Grid>
    </Box>
  );
};

SharedAPIData.propTypes = {
  data: PropTypes.array.isRequired
};

export default SharedAPIData;
