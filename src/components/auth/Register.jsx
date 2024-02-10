import React, { useContext } from "react";
import { Button, TextField, Paper } from "@mui/material";
import { register } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/MyContext";

const Register = () => {
  const navigate = useNavigate();
  const { setIsRegistered } = useContext(AuthContext);
  const handleRegister = e => {
    console.log(e.target);
    const { name, email, password } = e.target.elements;
    register(name.value, email.value, password.value)
      .then(result => {
        if (result.status === 200) {
          console.log(result.data.user);
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
    <Paper>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleRegister(e);
          e.currentTarget.reset();
        }}>
        <TextField required name="name" label="name" type="text" />
        <TextField required name="email" label="email" type="email" />
        <TextField required name="password" label="password" type="password" />
        <Button type="submit">Login</Button>
      </form>
    </Paper>
  );
};

export default Register;
