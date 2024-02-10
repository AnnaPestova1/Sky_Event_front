import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import { getMeteorShowersData } from "../../utils/fetchData";
import SharedAPIData from "./SharedAPIData";

const MeteorShowersData = ({ year, onLoad }) => {
  const [data, setData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getMeteorShowersData(year)
      .then(response => {
        setData(response.data.showersByYear);
        onLoad();
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
  }, [year]);
  const meteorShowerData = data.map(ms => {
    return {
      event: "meteor_shower",
      name: ms.meteorShowerName,
      date: ms.eventDate,
      description: ms.description,
      image: ms.image
    };
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  return (
    <>
      <SharedAPIData data={meteorShowerData} />
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

MeteorShowersData.propTypes = {
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoad: PropTypes.func
};

export default MeteorShowersData;
