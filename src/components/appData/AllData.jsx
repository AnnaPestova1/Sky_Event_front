import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Alert, Box, Grid, Snackbar } from "@mui/material";
import { AuthContext } from "../../utils/MyContext";
import SingleData from "./SingleData";
import { getAllData, deleteData } from "../../utils/fetchData";

const AllData = () => {
  const { isRegistered } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("AllData isRegistered", isRegistered);
  useEffect(() => {
    console.log("useEffect called");
    getAllData()
      .then(response => {
        console.log("all data response", response);
        setAllData(response.data.data);
      })
      .catch(error => {
        console.log(error);
        setOpenError(true);
        setErrorMessage(
          error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.response?.data ||
            error.message ||
            "unknown error"
        );
      });
  }, [isRegistered]);
  console.log(allData);
  const handleDelete = id => {
    deleteData(id)
      .then(response => {
        console.log(response);
        setAllData(allData.filter(data => id !== data._id));
      })
      .catch(error => {
        console.log(error);
        setOpenError(true);
        setErrorMessage(
          error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.response?.data ||
            error.message ||
            "unknown error"
        );
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  return (
    <Box
      component="span"
      p={2}
      sx={{
        display: "flex",

        minWidth: 275
      }}>
      <Grid container spacing={2}>
        {allData.map(data => (
          <SingleData
            data={data}
            key={data._id}
            handleDelete={() => handleDelete(data._id)}
          />
        ))}
      </Grid>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

AllData.propTypes = {};

export default AllData;
