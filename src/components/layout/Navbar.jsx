import React, { useState, useContext } from "react";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/MyContext";
import { logout } from "../../utils/fetchData";
import {
  Alert,
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const Navbar = () => {
  const { isRegistered, setIsRegistered } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const drawerWidth = 240;

  const handleLogout = () => {
    logout()
      .then(result => {
        if (result.status === 200) {
          setIsRegistered(false);
          sessionStorage.clear();
          // navigate("/");
        }
      })
      .catch(error => {
        console.log(error);
        setOpenError(true);
        setErrorMessage(
          error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.response?.data ||
            error.message ||
            "unknown error"
        );
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const navItems = [
    { displayName: "My Events", url: "/data", visible: isRegistered },
    { displayName: "Add Event", url: "/data/add", visible: isRegistered }
  ];
  const loginItems = [
    {
      displayName: "Sign Out",
      onClick: () => handleLogout(),
      visible: isRegistered
    },
    {
      displayName: "Register",
      onClick: () => navigate("/register"),
      visible: !isRegistered
    },
    {
      displayName: "Login",
      onClick: () => navigate("/login"),
      visible: !isRegistered
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SKY EVENTS
      </Typography>
      <Divider />
      <List>
        {navItems.map(item => {
          return (
            item.visible && (
              <ListItem key={item.displayName} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={() => navigate(item.url)}>
                  <ListItemText primary={item.displayName} />
                </ListItemButton>
              </ListItem>
            )
          );
        })}
      </List>
      <List>
        {loginItems.map(item => {
          return (
            item.visible && (
              <ListItem key={item.displayName} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={item.onClick}>
                  <ListItemText primary={item.displayName} />
                </ListItemButton>
              </ListItem>
            )
          );
        })}
      </List>
    </Box>
  );
  console.log("isRegistered navbar", isRegistered);

  return (
    <header>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" position="absolute">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                cursor: "pointer"
              }}
              onClick={() => navigate("/")}>
              SKY EVENTS
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map(item => {
                return (
                  item.visible && (
                    <Button
                      key={item.displayName}
                      sx={{ color: "#fff" }}
                      onClick={() => navigate(item.url)}>
                      {item.displayName}
                    </Button>
                  )
                );
              })}
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {loginItems.map(item => {
                return (
                  item.visible && (
                    <Button
                      key={item.displayName}
                      sx={{ color: "#fff" }}
                      onClick={item.onClick}>
                      {item.displayName}
                    </Button>
                  )
                );
              })}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            sx={{
              "display": { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth
              }
            }}>
            {drawer}
          </Drawer>
        </nav>
      </Box>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </header>
  );
};

Navbar.propTypes = {
  window: PropTypes.func
};

export default Navbar;
