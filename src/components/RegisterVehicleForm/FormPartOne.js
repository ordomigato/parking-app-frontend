import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { updateVRFormData } from "../../store/actions/registerFormData";
import { TextField, Grid } from "@material-ui/core";
import { checkField, checkAllFields } from "../../utils/validate";

const useStyles = makeStyles({
  isValid: {
    visibility: "hidden",
  },
  notValid: {
    visibility: "block",
  },
});

const FormPartOne = ({
  formData: { firstName, lastName, email, defaultPhone },
  updateVRFormData,
  setNextButtonState,
  user,
}) => {
  const classes = useStyles();
  const [validation, setValidation] = useState({
    firstNameError: true,
    lastNameError: true,
    emailError: true,
    defaultPhoneError: true,
  });

  const onChange = (e) => {
    // Update form
    const { value, name } = e.target;
    const newData = { key: name, value: value };
    updateVRFormData(newData);
    // Check current field
    const isValid = checkField(value, name);
    const validationStateKey = `${name}Error`;
    setValidation({ ...validation, [validationStateKey]: isValid });
  };

  useEffect(() => {
    // Check all fields
    const fields = { firstName, lastName, email, defaultPhone };
    const allValid = checkAllFields(fields);
    setNextButtonState(allValid);
  }, [firstName, lastName, email, defaultPhone]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          color="secondary"
          label="First Name"
          variant="outlined"
          name="firstName"
          type="text"
          fullWidth
          value={firstName}
          error={!validation.firstNameError}
          helperText="Please enter your first name"
          FormHelperTextProps={{
            classes: {
              root: validation.firstNameError
                ? classes.isValid
                : classes.notValid,
            },
          }}
          required
          onChange={(e) => onChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          color="secondary"
          label="Last Name"
          required
          variant="outlined"
          fullWidth
          type="text"
          name="lastName"
          value={lastName}
          helperText="Please enter your last name"
          FormHelperTextProps={{
            classes: {
              root: validation.lastNameError
                ? classes.isValid
                : classes.notValid,
            },
          }}
          error={!validation.lastNameError}
          onChange={(e) => onChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          color="secondary"
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          fullWidth
          value={email}
          error={!validation.emailError}
          helperText="ex. email@domain.com"
          FormHelperTextProps={{
            classes: {
              root: validation.emailError ? classes.isValid : classes.notValid,
            },
          }}
          onChange={(e) => onChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          color="secondary"
          label="Phone Number"
          variant="outlined"
          name="defaultPhone"
          type="text"
          fullWidth
          value={defaultPhone}
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
        />
      </Grid>
    </Grid>
  );
};

FormPartOne.propTypes = {
  updateVRFormData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  formData: state.registerVRFormData.formData,
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateVRFormData })(FormPartOne);
