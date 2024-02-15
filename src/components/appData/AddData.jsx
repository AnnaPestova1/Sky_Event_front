import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import EventForm from "./EventForm";
import { useNavigate } from "react-router-dom";
import { createData } from "../../utils/fetchData";

const AddData = () => {
  //manual adding data about an event
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onSubmitForm = eventObject => {
    createData(eventObject)
      .then(() => {
        navigate("/data");
      })
      .catch(error => {
        console.error(error);
        setOpenError(true);
        setErrorMessage(
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
        autoHideDuration={5000}
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
