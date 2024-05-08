import React from 'react';
import { useSignup } from '../context/SignupContext';
import { Button, Card, CardContent, CardHeader, Container, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const userData = useSignup();

  onchange = (event) => {
    const { name, value } = event.target;
    userData.updateUser({ ...userData.userData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Profile Updated successfully");
    navigate("/home");
  }

  
  return (
    <>
    <Navbar />
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "black", color: "white",padding: 4 }}>
      <CardHeader title="Profile" />
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
        <Typography>
          <TextField
          fullWidth
          label="Username"
          variant="outlined"
          placeholder='username'
          type="text" id="username" name="username" value={userData.userData.username} onChange={onchange}/>
        </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography>
          <TextField fullWidth label="Email" variant="outlined" type='email' id="email" name="email" value={userData.userData.email} onChange={onchange}/>
        </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography>
          <TextField fullWidth label="password" variant="outlined" type='password' id="password" name="password" value={userData.userData.password} onChange={onchange}/>
        </Typography>
        </Grid>
        <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Update
            </Button>
          </Grid>
        </Grid>
        </form>
        </CardContent>
      </Card>
    </Container>
    </>
  )
}

export default Profile
