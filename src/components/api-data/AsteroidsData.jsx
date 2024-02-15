import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import { getAsteroidsData } from "../../utils/fetchData";
import SharedAPIData from "./SharedAPIData";

const AsteroidsData = ({ year, onLoad }) => {
  const [data, setData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const defaultImage =
    "https://images-assets.nasa.gov/image/PIA23195/PIA23195~thumb.jpg";
  //receive information about asteroids from NASA API
  useEffect(() => {
    getAsteroidsData(year)
      .then(response => {
        setData(response.data.asteroidsData);
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
        6
      )} au. happens ${a.cd}, ${
        a.phys_par_title || "comet total magnitude"
      } is ${a.h || a.phys_par_value}.`,
      image: a.image || defaultImage
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
      <SharedAPIData data={asteroidData} />
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

AsteroidsData.propTypes = {
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoad: PropTypes.func
};

export default AsteroidsData;
