import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { getSolarEclipseData } from "../../utils/fetchData";
import SharedTable from "./SharedTable";

const SolarEclipseData = () => {
  const [data, setData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getSolarEclipseData()
      .then(response => {
        setData(response.data.data.eclipses_in_year);
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
  }, []);

  const eclipseData = data.map((eclipse, id) => {
    let date = `${eclipse.year}-${eclipse.month}-${eclipse.day}`;
    let eclipseName = eclipse.event
      .split(" ")
      .filter((_, i) => i < 3)
      .join(" ");

    return {
      id: id,
      event: "solar_eclipse",
      name: eclipseName,
      date: date,
      description: eclipse.event
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
      <SharedTable data={eclipseData} />
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

export default SolarEclipseData;
