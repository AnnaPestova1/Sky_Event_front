import React, { useContext, useState } from "react";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Snackbar,
  Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/MyContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setIsRegistered } = useContext(AuthContext);
  const handleRegister = e => {
    const { name, email, password, confirmPassword } = e.target.elements;
    register(name.value, email.value, password.value, confirmPassword.value)
      .then(result => {
        if (result.status === 201) {
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
          handleRegister(e);
          e.currentTarget.reset();
        }}>
        <Typography variant="h3" mb="50px">
          Register
        </Typography>
        <TextField
          required
          name="name"
          label="name"
          type="text"
          variant="outlined"
          fullWidth
          placeholder="Please enter your name"
        />
        <TextField
          required
          name="email"
          label="email"
          type="email"
          variant="outlined"
          fullWidth
          placeholder="Email format: name@example.com"
        />
        <TextField
          required
          fullWidth
          label="password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          placeholder="Password must be at least 8 characters long"
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
        <TextField
          required
          fullWidth
          label="confirm password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          placeholder="Repeat your password"
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
        <Button type="submit">Register</Button>
      </Box>
      {/* )} */}
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

export default Register;
