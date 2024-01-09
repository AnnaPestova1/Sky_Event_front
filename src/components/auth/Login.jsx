import { Button, TextField, Paper } from "@mui/material";
import React, { useContext } from "react";
import PropTypes from "prop-types";
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
          navigate("/data");
        }
      })
      .catch(error => {
        console.log(error.response.data?.msg);
        // if (error?.response?.data?.msg.includes("Invalid password")) {
        //   setErrorOccur(true);
        //   return;
        // }
        // if (error?.response?.data?.msg.includes("Invalid email")) {
        //   setErrorOccur(true);
        //   return;
        // }
      });
  };
  return (
    <Paper>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleLogin(e);
          e.currentTarget.reset();
        }}>
        <TextField required name="email" label="email" />
        <TextField required name="password" label="password" />
        <Button type="submit">Login</Button>
      </form>
    </Paper>
  );
};

// Login.propTypes = {
//   setIsRegistered: PropTypes.func
// };

export default Login;
