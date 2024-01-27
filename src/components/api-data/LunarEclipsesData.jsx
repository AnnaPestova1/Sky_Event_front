import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import { getLunarEclipsesData } from "../../utils/fetchData";
import SharedAPIData from "./SharedAPIData";

const LunarEclipsesData = ({ year }) => {
  const [data, setData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const totalLunarEclipse =
    "https://images-assets.nasa.gov/image/MAF_20211119_LunarEclipse01/MAF_20211119_LunarEclipse01~thumb.jpg";
  const lunarEclipse =
    "https://images-assets.nasa.gov/image/iss013e78721/iss013e78721~thumb.jpg";
  useEffect(() => {
    getLunarEclipsesData(year)
      .then(response => {
        setData(response.data.eclipsesByYear);
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

  const eclipseData = data.map(eclipse => {
    if (eclipse.name.includes("Total")) {
      eclipse.image = totalLunarEclipse;
    } else {
      eclipse.image = lunarEclipse;
    }
    return {
      event: "lunar_eclipse",
      name: eclipse.name,
      date: eclipse.date,
      description: eclipse.description,
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

LunarEclipsesData.propTypes = {
  year: PropTypes.number || PropTypes.string
};

export default LunarEclipsesData;
