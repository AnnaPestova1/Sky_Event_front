import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Box, Snackbar } from "@mui/material";
import EventForm from "./EventForm";
import { useNavigate } from "react-router-dom";
import { createData } from "../../utils/fetchData";
const AddData = () => {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onSubmitForm = eventObject => {
    createData({
      event: eventObject.event,
      name: eventObject.name,
      date: eventObject.date,
      description: eventObject.description
    })
      .then(() => {
        navigate("/data");
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
    <>
      <EventForm value={null} onSubmitForm={onSubmitForm} />
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddData;
