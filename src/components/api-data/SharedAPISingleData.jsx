import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import SharedCard from "../SharedCard";
import { createData } from "../../utils/fetchData";

const SharedAPISingleData = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const handleSaveEvent = () => {
    createData(data)
      .then(() => {
        setOpen(true);
        setSaved(true);
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

    setOpen(false);
    setOpenError(false);
  };
  return (
    <>
      <SharedCard data={data} handleSave={handleSaveEvent} saved={saved} />
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Event saved!
        </Alert>
      </Snackbar>
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

SharedAPISingleData.propTypes = {
  data: PropTypes.object
};

export default SharedAPISingleData;
