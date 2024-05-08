import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react';
import { useSignup } from '../../context/SignupContext';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const navigate=useNavigate();
    const userData = useSignup();
    onchange = (event) => {
        const { name, value } = event.target;
        userData.updateUser({ ...userData.userData, [name]: value });
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/login");
      }

  return (
    <Container  maxWidth="sm"
    sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              type="password"
              placeholder="New password"
              onChange={onchange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              type="password"
              placeholder="New Password"
              onChange={onchange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Change password
            </Button>
          </Grid>
        </Grid>
        </form>
    </Container>
  )
}

export default ForgotPassword
