import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { useSignup } from "../../context/SignupContext";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userData = useSignup();

  const onSubmit = (data) => {
    const storedUserData = userData;
    if (
      storedUserData &&
      storedUserData.userData.email === data.email &&
      storedUserData.userData.password === data.password
    ) {
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
    { !isLoggedIn ? (

    <Container
      maxWidth="sm"
      sx={{ mt: 8, backgroundColor: "white", padding: 4 }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              error={Boolean(errors.email)}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
              error={Boolean(errors.password)}
              helperText={errors.password ? errors.password.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
        <NavLink to='/login/forgotpassword' style={{display: 'block', textAlign: 'center', marginTop: '10px'}}>Forgot Password?</NavLink>
      </form>
    </Container>) : (
      <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Please Signup/Login to continue...
          </Typography>
      </Container>
    )}
    </>
  );
};

export default Login;
