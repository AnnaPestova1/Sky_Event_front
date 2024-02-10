import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import {
  Alert,
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  OutlinedInput,
  Paper,
  Snackbar,
  Typography,
  FormControl,
  Input,
  InputLabel
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { login } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/MyContext";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setIsRegistered } = useContext(AuthContext);
  const handleLogin = e => {
    console.log(e.target.elements);
    const { email, password } = e.target.elements;
    login(email.value, password.value)
      .then(result => {
        console.log(result);
        if (result.status === 200) {
          sessionStorage.setItem("jwtToken", result.data.token);
          sessionStorage.setItem("username", result.data.user.name);
          setIsRegistered(true);
          navigate("/");
        }
      })
      .catch(error => {
        console.error(error);
        setOpenError(true);
        setErrorMessage(error.response.data?.message);
      });
  };
  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  return (
    <>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="50%"
        gap={1}
        onSubmit={e => {
          e.preventDefault();
          handleLogin(e);
          e.currentTarget.reset();
        }}>
        <Typography variant="h3" mb="50px">
          Login
        </Typography>

        <TextField
          required
          name="email"
          label="email"
          type="email"
          variant="outlined"
          placeholder=""
          fullWidth
        />
        <TextField
          required
          fullWidth
          label="password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button type="submit">Login</Button>
      </Box>
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

export default Login;
