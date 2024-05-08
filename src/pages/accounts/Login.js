import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { useSignup } from "../../context/SignupContext";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userData = useSignup();

  const onSubmit = (data) => {
    const storedUserData = userData;
    const userExist=localStorage.getItem("user")===null;
    if (userExist) {
      toast.error("Please Signup first");
    }else{
    if (storedUserData.userData){
      if (storedUserData.userData.email === data.email &&
        storedUserData.userData.password === data.password) {
          toast.success("Login successful");
          localStorage.setItem("IsLoggedIn", true);
          navigate("/home");
      }else {
        toast.error("Invalid email or password");
      }
    }}}
      
   

  return (
    <>
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Grid>
          </Grid>
          <NavLink
            to="/login/forgotpassword"
            style={{ display: "block", textAlign: "center", marginTop: "10px" }}
          >
            Forgot Password?
          </NavLink>
        </form>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ marginTop: "10px" }}
          >
            Don't have an Account? Signup Here
          </Button>
        </Grid>
      </Container>
    </>
  );
}

export default Login;
