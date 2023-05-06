// import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'#ee1155'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <Menu /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
            News
          </Typography>
          
          <Button color="inherit"><Link style={{textDecoration:'none',color:'white'}} to='/'>Home</Link></Button>
          <Button color="inherit"><Link style={{textDecoration:'none',color:'white'}} to='/add'>Add Person</Link></Button>

          

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
