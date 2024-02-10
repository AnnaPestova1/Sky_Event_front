import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import { getSolarEclipsesData } from "../../utils/fetchData";
import SharedAPIData from "./SharedAPIData";

const SolarEclipsesData = ({ year, onLoad }) => {
  const [data, setData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const totalSolarEclipseImg =
    "https://images-assets.nasa.gov/image/AFRC2017-0233-006/AFRC2017-0233-006~thumb.jpg";
  const annularSolarEclopseImg =
    "https://images-assets.nasa.gov/image/NHQ201708210100/NHQ201708210100~thumb.jpg";
  const partialSolarEclipseImg =
    "https://images-assets.nasa.gov/image/NHQ201708210302/NHQ201708210302~thumb.jpg";

  //receive information about solar eclipses from Astronomical Applications Department of the U.S. Naval Observatory API
  useEffect(() => {
    getSolarEclipsesData(year)
      .then(response => {
        setData(response.data.data.eclipses_in_year);
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

  const eclipseData = data.map(eclipse => {
    let date = `${eclipse.year}-${eclipse.month}-${eclipse.day}`;
    let eclipseName = eclipse.event
      .split(" ")
      .filter((_, i) => i < 3)
      .join(" ");
    if (eclipseName.includes("Total")) {
      eclipse.image = totalSolarEclipseImg;
    } else if (eclipseName.includes("Annular")) {
      eclipse.image = annularSolarEclopseImg;
    } else {
      eclipse.image = partialSolarEclipseImg;
    }
    return {
      event: "solar_eclipse",
      name: eclipseName,
      date: date,
      description: eclipse.event,
      image: eclipse.image
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
      <SharedAPIData data={eclipseData} />
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

SolarEclipsesData.propTypes = {
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoad: PropTypes.func
};

export default SolarEclipsesData;
