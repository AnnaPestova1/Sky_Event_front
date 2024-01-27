import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Box
} from "@mui/material";
import { AuthContext } from "../../utils/MyContext";
import CometsData from "../api-data/CometsData";
import AsteroidsData from "../api-data/AsteroidsData";
import SolarEclipsesData from "../api-data/SolarEclipsesData";
import LunarEclipsesData from "../api-data/LunarEclipsesData";
import MeteorShowersData from "../api-data/MeteorShowersData";

const MainPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [skyEvent, setSkyEvent] = useState("");
  const { isRegistered } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChangeYear = event => {
    setYear(event.target.value);
  };
  const handleChangeSkyEvent = event => {
    setSkyEvent(event.target.value);
  };
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <h1>Sky Events</h1>
      </Box>
      {isRegistered ? (
        <>
          <Box display="flex" justifyContent="center" overflow="auto">
            <FormControl sx={{ m: 1, maxWidth: 170 }}>
              <TextField
                id="choose_year"
                label="Year"
                value={year}
                onChange={handleChangeYear}
                type="number"
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 170 }}>
              <InputLabel id="choose_sky_event">Sky Event</InputLabel>
              <Select
                labelId="choose_sky_event"
                id="choose_sky_event"
                value={skyEvent}
                label="Sky Event"
                onChange={handleChangeSkyEvent}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"comet"}>Comet</MenuItem>
                <MenuItem value={"asteroid"}>Asteroid</MenuItem>
                <MenuItem value={"meteor_shower"}>Meteor Shower</MenuItem>
                <MenuItem value={"solar_eclipse"}>Solar Eclipse</MenuItem>
                <MenuItem value={"lunar_eclipse"}>Lunar Eclipse</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="center">
            <FormHelperText sx={{ maxWidth: 350 }}>
              available data: for meteor showers 2024-2034; for lunar eclipses:
              2023-2040
            </FormHelperText>
          </Box>
          {skyEvent === "comet" && <CometsData year={year} />}
          {skyEvent === "asteroid" && <AsteroidsData year={year} />}
          {skyEvent === "meteor_shower" && <MeteorShowersData year={year} />}
          {skyEvent === "solar_eclipse" && <SolarEclipsesData year={year} />}
          {skyEvent === "lunar_eclipse" && <LunarEclipsesData year={year} />}
        </>
      ) : (
        <Box gap={1} display="flex" justifyContent="center">
          <Button variant="outlined" onClick={() => navigate("/register")}>
            Register
          </Button>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MainPage;
