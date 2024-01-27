import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Paper } from "@mui/material";
import { login } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/MyContext";
const Login = () => {
  const navigate = useNavigate();
  const { setIsRegistered } = useContext(AuthContext);
  const handleLogin = e => {
    console.log(e.target.elements);
    const { email, password } = e.target.elements;
    login(email.value, password.value)
      .then(result => {
        if (result.status === 200) {
          sessionStorage.setItem("jwtToken", result.data.token);
          sessionStorage.setItem("username", result.data.user.name);
          setIsRegistered(true);
          navigate("/");
        }
      })
      .catch(error => {
        console.log(error.response.data?.msg);
      });
  };
  return (
    <>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="100%"
        width="50%"
        gap={1}
        onSubmit={e => {
          e.preventDefault();
          handleLogin(e);
          e.currentTarget.reset();
        }}>
        <TextField
          required
          name="email"
          label="email"
          type="email"
          variant="standard"
        />
        <TextField
          required
          name="password"
          label="password"
          type="password"
          variant="standard"
        />
        <Button type="submit">Login</Button>
      </Box>
    </>
  );
};

export default Login;
