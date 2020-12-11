import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";

const ErrorMessage = ({ message }) => {
  return (
    <Alert className="my-5 w-full" severity="error">
      {message}
    </Alert>
  );
};

export default ErrorMessage;
