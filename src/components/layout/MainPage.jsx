import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Box,
  Typography
} from "@mui/material";
import Google from "@mui/icons-material/Google";
import { AuthContext } from "../../utils/MyContext";
import { getGoogleOAuthURL } from "../../utils/fetchData";
import CometsData from "../api-data/CometsData";
import AsteroidsData from "../api-data/AsteroidsData";
import SolarEclipsesData from "../api-data/SolarEclipsesData";
import LunarEclipsesData from "../api-data/LunarEclipsesData";
import MeteorShowersData from "../api-data/MeteorShowersData";

const MainPage = () => {
  //Main page that render different layouts for registered and unregistered users.
  //getGoogleOAuthURL function allows to use Google OAuth
  const [year, setYear] = useState(new Date().getFullYear());
  const [skyEvent, setSkyEvent] = useState("");
  const [loading, setLoading] = useState(true);
  const { isRegistered } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChangeYear = event => {
    setYear(event.target.value);
    setLoading(true);
  };
  const handleChangeSkyEvent = event => {
    setSkyEvent(event.target.value);
    setLoading(true);
  };
  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={5}>
        <Typography variant="h3">Sky Events</Typography>
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
          <Box display="flex" justifyContent="center">
            {skyEvent && loading && <CircularProgress />}
          </Box>
          {skyEvent === "comet" && (
            <CometsData
              year={year}
              onLoad={() => {
                setLoading(false);
              }}
            />
          )}
          {skyEvent === "asteroid" && (
            <AsteroidsData
              year={year}
              onLoad={() => {
                setLoading(false);
              }}
            />
          )}
          {skyEvent === "meteor_shower" && (
            <MeteorShowersData
              year={year}
              onLoad={() => {
                setLoading(false);
              }}
            />
          )}
          {skyEvent === "solar_eclipse" && (
            <SolarEclipsesData
              year={year}
              onLoad={() => {
                setLoading(false);
              }}
            />
          )}
          {skyEvent === "lunar_eclipse" && (
            <LunarEclipsesData
              year={year}
              onLoad={() => {
                setLoading(false);
              }}
            />
          )}
        </>
      ) : (
        <>
          <Box gap={1} display="flex" justifyContent="center">
            <Button variant="outlined" onClick={() => navigate("/register")}>
              Register
            </Button>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" m="10px">
            <Button
              startIcon={<Google />}
              variant="outlined"
              sx={{
                "&:hover": {
                  color: "inherit"
                }
              }}
              href={getGoogleOAuthURL()}>
              Login with Google
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MainPage;
