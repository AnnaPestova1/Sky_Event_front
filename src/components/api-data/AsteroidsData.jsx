import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import { getAsteroidsData } from "../../utils/fetchData";
import SharedTable from "./SharedTable";

const AsteroidsData = ({ year }) => {
  const [data, setData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAsteroidsData(year)
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

  const asteroidData = data.map((a, id) => {
    return {
      id: id,
      event: "comet",
      name: a[0],
      date: a[3],
      description: `Asteroid ${
        a[0]
      } approach. Minimal distance from Earth ${Number(a[5]).toFixed(4)} au`
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
      <SharedTable data={asteroidData} />
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

AsteroidsData.propTypes = {
  year: PropTypes.number
};

export default AsteroidsData;
