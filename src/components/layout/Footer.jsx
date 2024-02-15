import React from "react";
import { Box, IconButton } from "@mui/material";
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
export default Footer;
