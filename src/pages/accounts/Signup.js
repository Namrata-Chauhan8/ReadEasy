import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../context/SignupContext";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signupSuccess } from "../../redux/action/Action";

const Signup = () => {
  const { updateUser } = useSignup();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   updateUser(data);
  //   localStorage.setItem("user", JSON.stringify(data));
  //   toast.success("Signup Successful");
  //   navigate("/login");
  // };
  
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
     await updateUser(data);
      dispatch(signupSuccess(data));
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: "Username is required" })}
              error={Boolean(errors.username)}
              helperText={errors.username ? errors.username.message : ""}
            />
          </Grid>
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
              Signup
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={() => navigate("/login")} sx={{ marginTop: "10px" }}>
              Already have an account? Login here
            </Button>
          </Grid>
      </form>
    </Container>
  );
};

export default Signup;
