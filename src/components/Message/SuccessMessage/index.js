import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";

const SuccessMessage = ({ message }) => {
  return (
    <Alert className="my-5 w-full" severity="success">
      {message}
    </Alert>
  );
};

export default SuccessMessage;
