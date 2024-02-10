import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../utils/MyContext";
import { logout } from "../../utils/fetchData";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
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
  const location = useLocation();
  const drawerWidth = 240;
  const handleLogout = () => {
    logout()
      .then(result => {
        if (result.status === 200) {
          setIsRegistered(false);
          sessionStorage.clear();
        }
      })
      .catch(error => {
        console.error(error);
        setOpenError(true);
        setErrorMessage(
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
    {
      displayName: "Home",
      onClick: () => navigate("/"),
      visible: true,
      active: location.pathname === "/"
    },
    {
      displayName: "My Events",
      onClick: () => navigate("/data"),
      visible: isRegistered,
      active: location.pathname === "/data"
    },
    {
      displayName: "Add Event",
      onClick: () => navigate("/data/add"),
      visible: isRegistered,
      active: location.pathname === "/data/add"
    },
    {
      displayName: "Sign Out",
      onClick: () => handleLogout(),
      visible: isRegistered
    },
    {
      displayName: "Register",
      onClick: () => navigate("/register"),
      visible: !isRegistered,
      active: location.pathname === "/register"
    },
    {
      displayName: "Login",
      onClick: () => navigate("/login"),
      visible: !isRegistered,
      active: location.pathname === "/login"
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
              <ListItemButton
                key={item.displayName}
                sx={{ textAlign: "center" }}
                onClick={item.onClick}
                selected={item.active}>
                <ListItemText primary={item.displayName} />
              </ListItemButton>
            )
          );
        })}
      </List>
    </Box>
  );

  return (
    <header>
      <AppBar component="nav" position="static">
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
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            {navItems.map(item => {
              return (
                item.visible && (
                  <Button
                    key={item.displayName}
                    onClick={item.onClick}
                    variant={item.active ? "contained" : "text"}>
                    {item.displayName}
                  </Button>
                )
              );
            })}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
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
      <Snackbar
        open={openError}
        autoHideDuration={5000}
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
