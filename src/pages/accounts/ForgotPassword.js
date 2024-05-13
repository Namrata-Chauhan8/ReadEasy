import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSignup } from "../../context/SignupContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { passwordChangeSuccess } from "../../redux/action/Action";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSignup();
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (event) => {
    setNewPassword(event.target.value);
  };

  //password change without redux is given below 

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     if (localStorage.getItem("user") === null) {
  //       toast.error("Please signup first");
  //       navigate("/");
  //       return;
  //     }
  //     const enteredEmail = event.target[0].value;
  //     const storedUserData = JSON.parse(localStorage.getItem("user"));

  //     if (!storedUserData || enteredEmail !== storedUserData.email) {
  //       toast.error("Invalid credentials");
  //     } else {
  //       userData.updateUser({ ...userData.userData, password: newPassword });
  //       toast.success("Password changed successfully");
  //       navigate("/login");
  //     }
  //   };

  //password change with redux is given below 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (localStorage.getItem("user") === null) {
      toast.error("Please signup first");
      navigate("/");
      return;
    }
    const enteredEmail = event.target[0].value;
    const storedUserData = JSON.parse(localStorage.getItem("user"));

    if (!storedUserData || enteredEmail !== storedUserData.email) {
      toast.error("Invalid credentials");
    } else {
      userData.updateUser({ ...userData.userData, password: newPassword });

      dispatch(passwordChangeSuccess());
      toast.success("Password changed successfully");
      navigate("/login");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 8, backgroundColor: "white", padding: 4 }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              placeholder="Enter your email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Change password
            </Button>
            <Button sx={{ mt: 2 }} variant="outlined" color="secondary" onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ForgotPassword;
