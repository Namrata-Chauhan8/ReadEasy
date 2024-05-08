import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import { useSignup } from '../../context/SignupContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const userData = useSignup();
    const [newPassword, setNewPassword] = useState('');

    const handleChange = (event) => {
        setNewPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        userData.updateUser({ ...userData.userData, password: newPassword });
        toast.success("Password changed successfully");
        navigate("/login");
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
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
                            value={newPassword}
                            onChange={handleChange}
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

export default ForgotPassword;
