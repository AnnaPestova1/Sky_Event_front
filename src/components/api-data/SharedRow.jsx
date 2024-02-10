import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar, TableCell, TableRow, Button } from "@mui/material";
import { createData } from "../../utils/fetchData";

const SharedRow = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const eventMap = [
    { value: "comet", displayName: "Comet" },
    { value: "asteroid", displayName: "Asteroid" },
    { value: "meteor_shower", displayName: "Meteor Shower" },
    { value: "solar_eclipse", displayName: "Solar Eclipse" },
    { value: "lunar_eclipse", displayName: "Lunar Eclipse" }
  ];
  const date = new Date(data.date).toLocaleDateString();
  const handleSaveEvent = () => {
    createData(data)
      .then(() => {
        setOpen(true);
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
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenError(false);
  };
  return (
    <>
      <TableRow
        key={data.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" align="center">
          {eventMap.map(event => {
            if (event.value === data.event) {
              return event.displayName;
            }
          })}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {data.name}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {date}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {data.description}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Button onClick={handleSaveEvent}>Save</Button>
        </TableCell>
      </TableRow>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Event saved!
        </Alert>
      </Snackbar>
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

SharedRow.propTypes = {
  data: PropTypes.object
};

export default SharedRow;
