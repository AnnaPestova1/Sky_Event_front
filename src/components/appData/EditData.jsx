import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import EventForm from "./EventForm";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleData, editData } from "../../utils/fetchData";

const EditData = () => {
  const [data, setData] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { slug } = useParams();
  const dataId = slug;
  const navigate = useNavigate();

  useEffect(() => {
    getSingleData(dataId)
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
        setOpenError(true);
        setErrorMessage(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.response?.data ||
            error.message ||
            "unknown error"
        );
      });
  }, []);
  const onSubmitForm = eventObject => {
    console.log(
      "eventObject",
      eventObject._id,
      eventObject.event,
      eventObject.name,
      eventObject.date,
      eventObject.description
    );
    editData({
      _id: data._id,
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
      {data && <EventForm value={data} onSubmitForm={onSubmitForm} />}
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

export default EditData;
