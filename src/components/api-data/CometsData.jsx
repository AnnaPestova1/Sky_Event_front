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
        console.log(response.data.cometsData);
        setData(response.data.cometsData);
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
      } is ${comet.h || comet.phys_par_value}.`
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