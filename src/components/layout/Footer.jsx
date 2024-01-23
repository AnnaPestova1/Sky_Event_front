import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        paddingLeft={2}
        bgcolor="secondary.main">
        <Box
          flexGrow="1"
          display="flex"
          flexDirection="row"
          alignItems="center"
          height="100%">
          <CopyrightIcon />
          {currentYear} Anna Pestova
        </Box>
        <Box>
          <IconButton
            color="inherit"
            aria-label="to github"
            href="https://github.com/AnnaPestova1"
            sx={{ mr: 2 }}>
            <GitHubIcon />
          </IconButton>
        </Box>
      </Box>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;

// <div class="d-flex align-items-center ", style="height: 100%; width: 95%">
//   <div class="flex-grow-1" >
//     <i class="bi bi-c-circle"></i>
//     <%=  Time.now.year%>  Anna Pestova
//   </div>
//   <div>
//     <a href="https://github.com/AnnaPestova1">
//       <i class="bi bi-github"></i>
//     </a>
//   </div>
// </div>
