import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, TextField, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateCurrentUser } from "../../../../store/actions/auth";
import { checkField, checkAllFields } from "../../../../utils/validate";
import ErrorMessage from "../../../Message/ErrorMessage";

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
  isValid: {
    visibility: "hidden",
  },
  notValid: {
    visibility: "block",
  },
}));

const EditInfo = ({ user, errors, updateCurrentUser }) => {
  const classes = useStyles();

  const [buttonState, setButtonState] = useState(true);
  const [validation, setValidation] = useState({
    firstNameError: true,
    lastNameError: true,
    emailError: true,
    defaultPhoneError: true,
  });
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    defaultPhone: user.defaultPhone,
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setUserData({
      ...user,
      [name]: value,
    });
    const isValid = checkField(value, name);
    const validationStateKey = `${name}Error`;
    setValidation({ ...validation, [validationStateKey]: isValid });
  };

  useEffect(() => {
    const fields = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      defaultPhone: userData.defaultPhone,
    };
    const allValid = checkAllFields(fields);
    console.log(allValid);
    setButtonState(allValid);
  }, [userData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    updateCurrentUser(userData);
  };

  return (
    <Container component="main" maxWidth="xs">
      {errors &&
        errors.map((error) => <ErrorMessage message={error} key={error} />)}
      <div className={classes.paper}>
        <h2 component="h1" variant="h5">
          Edit Personal Information
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
            id="firstName"
            label="First Name"
            type="text"
            name="firstName"
            value={userData.firstName}
            autoComplete="off"
            error={!validation.firstNameError}
            helperText="Please enter your first name"
            FormHelperTextProps={{
              classes: {
                root: validation.firstNameError
                  ? classes.isValid
                  : classes.notValid,
              },
            }}
            onChange={(e) => onChange(e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            type="text"
            name="lastName"
            value={userData.lastName}
            helperText="Please enter your last name"
            FormHelperTextProps={{
              classes: {
                root: validation.lastNameError
                  ? classes.isValid
                  : classes.notValid,
              },
            }}
            error={!validation.lastNameError}
            autoComplete="family-name"
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            type="text"
            name="email"
            value={userData.email}
            error={!validation.emailError}
            helperText="ex. email@domain.com"
            FormHelperTextProps={{
              classes: {
                root: validation.emailError
                  ? classes.isValid
                  : classes.notValid,
              },
            }}
            onChange={(e) => onChange(e)}
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="defaultPhone"
            label="Phone"
            type="text"
            name="defaultPhone"
            value={userData.defaultPhone}
            error={!validation.defaultPhoneError}
            helperText="ex. xxx-xxx-xxxx"
            FormHelperTextProps={{
              classes: {
                root: validation.defaultPhoneError
                  ? classes.isValid
                  : classes.notValid,
              },
            }}
            onChange={(e) => onChange(e)}
            autoComplete="phone"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!buttonState}
          >
            Submit Changes
          </Button>
        </form>
      </div>
    </Container>
  );
};

EditInfo.propTypes = {
  updateCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  errors: state.auth.errors.updateUser,
});

export default connect(mapStateToProps, { updateCurrentUser })(EditInfo);
