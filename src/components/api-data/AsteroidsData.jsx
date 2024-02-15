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
        console.log(response.data.asteroidsData);
        setData(response.data.asteroidsData);
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

  const asteroidData = data.map(a => {
    return {
      event: "asteroid",
      name: a.fullname.trim() || a.des,
      date: a.cd,
      description: `Asteroid ${a.fullname.trim() || a.des} has ${
        a.orbit_class
      } orbit class. First observation was ${
        a.first_obs
      }, asteroid was last time observed ${
        a.last_obs
      }.  Minimal distance from Earth is ${Number(a.dist_min).toFixed(
        4
      )} au. happens ${a.cd}, ${
        a.phys_par_title || "comet total magnitude"
      } is ${a.h || a.phys_par_value}.`
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
