import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black", marginTop: "2px"}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
         ReadEasy
        </Typography>
        <Box>
          {window.location.pathname === "/mycart" ? (
            <Button color="inherit" component={NavLink} to="/home">
              Home{" "}
            </Button>
          ) : (
            <Button
              color="inherit"
              component={NavLink}
              to="/mycart"
              sx={{ mx: 1 }}
            >
              My Cart{" "}
            </Button>
          )}

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          {window.location.pathname === "/profile" ? (
            <Button color="inherit" component={NavLink} to="/home">Home{" "}</Button>
          ):(
            <Button>
            <AccountCircleRoundedIcon sx={{fontSize: "40px", color: "white"}} onClick={() => navigate("/profile")}/>
            </Button>
          )}
         
         
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;