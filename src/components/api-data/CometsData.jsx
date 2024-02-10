import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import { getCometsData } from "../../utils/fetchData";
import SharedTable from "./SharedTable";

const CometsData = ({ year }) => {
  const [data, setData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getCometsData(year)
      .then(response => {
        console.log(response.data.data.data);
        setData(response.data.data.data);
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
  }, [year]);

  const cometData = data.map((comet, id) => {
    return {
      id: id,
      event: "comet",
      name: comet[13] || comet[0],
      date: comet[3],
      description: `Comet ${comet[0]} approach. Minimal distance from ${Number(
        comet[5]
      ).toFixed(2)} au`
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
      <SharedTable data={cometData} />
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

CometsData.propTypes = {
  year: PropTypes.number
};

export default CometsData;
