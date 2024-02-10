import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import { getCometsData } from "../../utils/fetchData";
import SharedAPIData from "./SharedAPIData";

const CometsData = ({ year, onLoad }) => {
  const [data, setData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getCometsData(year)
      .then(response => {
        setData(response.data.cometsData);
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
  const defaultImage =
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001322/GSFC_20171208_Archive_e001322~thumb.jpg";
  //receive information about comets from NASA API
  const cometData = data.map(comet => {
    return {
      event: "comet",
      name: comet.fullname.trim() || comet.des,
      date: comet.cd,
      description: `Comet ${comet.fullname.trim() || comet.des} is a ${
        comet.orbit_class
      }. First observation was ${
        comet.first_obs
      }, comet was last time observed ${
        comet.last_obs
      }.  Minimal distance from Earth is ${Number(comet.dist_min).toFixed(
        2
      )} au. happens ${comet.cd}, ${
        comet.phys_par_title || "comet total magnitude"
      } is ${comet.h || comet.phys_par_value}.`,
      image: comet.image || defaultImage
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
      <SharedAPIData data={cometData} />
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

CometsData.propTypes = {
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoad: PropTypes.func
};

export default CometsData;
