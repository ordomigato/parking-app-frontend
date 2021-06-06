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

const FormPartTwo = ({
  formData,
  // add vmodel, vmake if wanted
  formData: { vplate, vcolor },
  updateVRFormData,
  setNextButtonState,
}) => {
  const classes = useStyles();
  const [validation, setValidation] = useState({
    vplateError: true,
    vmodelError: true,
    vmakeError: true,
    vcolorError: true,
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    const newData = { key: name, value: value };
    updateVRFormData(newData);
    const isValid = checkField(value, name);
    const validationStateKey = `${name}Error`;
    setValidation({ ...validation, [validationStateKey]: isValid });
  };

  useEffect(() => {
    // add vmodel, vmake if wanted
    const fields = { vplate, vcolor };
    const allValid = checkAllFields(fields);
    setNextButtonState(allValid);
  }, [formData]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TextField
          color="secondary"
          label="Plate Number"
          variant="outlined"
          name="vplate"
          type="text"
          fullWidth
          value={vplate}
          error={!validation.vplateError}
          helperText="Please enter your plate number"
          FormHelperTextProps={{
            classes: {
              root: validation.vplateError ? classes.isValid : classes.notValid,
            },
          }}
          required
          onChange={(e) => onChange(e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          color="secondary"
          label="Vehicle Color"
          variant="outlined"
          type="text"
          fullWidth
          name="vcolor"
          value={vcolor}
          error={!validation.vcolorError}
          helperText="Please enter your vehicle's color"
          FormHelperTextProps={{
            classes: {
              root: validation.vcolorError ? classes.isValid : classes.notValid,
            },
          }}
          required
          onChange={(e) => onChange(e)}
        />
      </Grid>
      {/* <Grid item xs={6}>
        <TextField
          color="secondary"
          label="Vehicle Make"
          variant="outlined"
          name="vmake"
          type="text"
          fullWidth
          value={vmake}
          error={!validation.vmakeError}
          helperText="Please enter your vehicle's make"
          FormHelperTextProps={{
            classes: {
              root: validation.vmakeError ? classes.isValid : classes.notValid,
            },
          }}
          required
          onChange={(e) => onChange(e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          color="secondary"
          label="Vehicle Model"
          variant="outlined"
          type="text"
          fullWidth
          name="vmodel"
          value={vmodel}
          error={!validation.vmodelError}
          helperText="Please enter your vehicle's model"
          FormHelperTextProps={{
            classes: {
              root: validation.vmodelError ? classes.isValid : classes.notValid,
            },
          }}
          required
          onChange={(e) => onChange(e)}
        />
      </Grid> */}
    </Grid>
  );
};

FormPartTwo.propTypes = {
  updateVRFormData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  formData: state.registerVRFormData.formData,
});

export default connect(mapStateToProps, { updateVRFormData })(FormPartTwo);
