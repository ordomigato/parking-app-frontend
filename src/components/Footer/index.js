import React from "react";
import { Link, Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <footer className={`py-10 px-2`}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://skyviewsecurity.ca/">
          Skyview Security
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
};

export default Footer;
