import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, TextField, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { changePassword } from "../../../../store/actions/auth";
import ErrorMessage from "../../../Message/ErrorMessage";
import SuccessMessage from "../../../Message/SuccessMessage";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ChangePassword = ({ errors, changePassword }) => {
  const classes = useStyles();

  const [buttonState, setButtonState] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const onChange = (e) => {
    setButtonState(false);
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await changePassword(passwordData)
      .then((res) => setSuccessMessage(res.data.message))
      .catch((err) => {
        console.log(err);
        setSuccessMessage("");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      {errors &&
        errors.map((error) => <ErrorMessage message={error} key={error} />)}
      {successMessage && <SuccessMessage message={successMessage} />}
      <div className={classes.paper}>
        <h2 component="h1" variant="h5">
          Change Password
        </h2>
        <form
          className={classes.form}
          method="post"
          onSubmit={(e) => onSubmit(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="oldPassword"
            label="Old Password"
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            autoComplete="off"
            onChange={(e) => onChange(e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            autoComplete="family-name"
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmNewPassword"
            label="confirm Password"
            type="password"
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={(e) => onChange(e)}
            autoComplete="email"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={buttonState}
          >
            Change Password
          </Button>
        </form>
      </div>
    </Container>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.auth.errors.changePassword,
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
