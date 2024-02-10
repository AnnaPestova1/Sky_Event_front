import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Snackbar,
  Stack,
  TablePagination,
  Typography
} from "@mui/material";
import { AuthContext } from "../../utils/MyContext";
import SingleData from "./SingleData";
import { getAllData, deleteData } from "../../utils/fetchData";

const AllData = () => {
  const { isRegistered } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filtering, setFiltering] = useState("");
  const pageTopRef = useRef(null);
  const navigate = useNavigate();

  console.log("AllData isRegistered", isRegistered);
  useEffect(() => {
    console.log("useEffect called");
    console.log(page);
    getAllData(page, filtering)
      .then(response => {
        console.log("all data response", response);
        setAllData(response.data.data);
        setTotalPage(response.data.totalCount);
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
  }, [page, filtering]);

  const handleDelete = id => {
    deleteData(id)
      .then(response => {
        console.log(response);
        setAllData(allData.filter(data => id !== data._id));
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
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const handleChange = (event, value) => {
    setPage(value);
    pageTopRef.current.scrollIntoView();
  };

  const handleFilteringChange = event => {
    setFiltering(event.target.value);
    setPage(1);
  };

  return (
    <Box
      component="span"
      gap={2}
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minWidth={275}
      ref={pageTopRef}>
      <Box
        flexDirection="row"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%">
        <Typography
          variant="h3"
          component="div"
          gutterBottom
          display="flex"
          justifyContent="center"
          flexGrow={1}>
          My Sky Events
        </Typography>
        {allData.length > 0 && (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="choose_filtering">Filter by</InputLabel>
            <Select
              labelId="choose_filtering"
              id="filtering"
              value={filtering}
              onChange={handleFilteringChange}
              label="Filter by">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="comet">comets</MenuItem>
              <MenuItem value="asteroid">asteroids</MenuItem>
              <MenuItem value="meteor_shower">meteor showers</MenuItem>
              <MenuItem value="solar_eclipse">solar eclipses</MenuItem>
              <MenuItem value="lunar_eclipse">lunar eclipses</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>
      {allData.length === 0 && (
        <>
          <Typography variant="subtitle1" component="div" gutterBottom>
            Seems you do not have any sky events yet
          </Typography>
          <Button
            key="Add Event"
            variant="outlined"
            onClick={() => navigate("/data/add")}>
            Add Event
          </Button>
        </>
      )}
      {allData.length > 0 && (
        <>
          <Grid container spacing={2}>
            {allData.map(data => (
              <SingleData
                data={data}
                key={data._id}
                handleDelete={() => handleDelete(data._id)}
              />
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" spacing={2}>
            <Stack>
              <Pagination
                count={totalPage}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </Box>
        </>
      )}
      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

AllData.propTypes = {};

export default AllData;
