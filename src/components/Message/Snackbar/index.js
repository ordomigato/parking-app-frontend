import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { default as Snack } from "@material-ui/core/Snackbar";

const Snackbar = ({ isOpen, handleClose, message, hideDuration, severity }) => (
  <Snack
    open={isOpen}
    autoHideDuration={hideDuration}
    onClose={handleClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
  >
    <MuiAlert
      elevation={6}
      variant="filled"
      onClose={handleClose}
      severity={severity}
    >
      {message}
    </MuiAlert>
  </Snack>
);

export default Snackbar;
