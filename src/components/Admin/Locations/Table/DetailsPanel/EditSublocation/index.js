import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Container } from "@material-ui/core";
import { checkField, checkAllFields } from "../../../../../../utils/validate";
import { updateSublocation } from "../../../../../../store/actions/locations";
import ErrorMessage from "../../../../../Message/ErrorMessage";
import SuccessMessage from "../../../../../Message/SuccessMessage";

const useStyles = makeStyles(theme => ({
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

const EditSublocation = ({ sublocation, updateSublocation }) => {
  const classes = useStyles();

  const [buttonState, setButtonState] = useState(true);
  const [validation, setValidation] = useState({
    sublocationNameError: true,
  });

  const [sublocationData, setSublocationData] = useState({
    sublocationName: sublocation.name,
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const onChange = e => {
    const { value, name } = e.target;
    setSublocationData({
      ...sublocation,
      [name]: value,
    });
    const isValid = checkField(value, name);
    const validationStateKey = `${name}Error`;
    setValidation({ ...validation, [validationStateKey]: isValid });
  };

  useEffect(() => {
    const fields = {
      sublocationName: sublocationData.sublocationName,
    };
    const allValid = checkAllFields(fields);
    setButtonState(allValid);
  }, [sublocationData]);

  const onSubmit = async e => {
    e.preventDefault();
    sublocationData.name = sublocationData.sublocationName;
    updateSublocation(sublocationData).then(res =>
      setSuccessMessage(res.data.message)
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      {errors &&
        errors.map(error => <ErrorMessage message={error} key={error} />)}
      {successMessage && <SuccessMessage message={successMessage} />}
      <div className={classes.paper}>
        <h2 component="h1" variant="h5">
          Edit Sublocation
        </h2>
        <form
          className={classes.form}
          method="post"
          onSubmit={e => onSubmit(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="sublocationName"
            label="Sublocation Name"
            type="text"
            name="sublocationName"
            value={sublocationData.sublocationName}
            autoComplete="off"
            error={!validation.sublocationNameError}
            helperText="Please enter the sublocation's name"
            FormHelperTextProps={{
              classes: {
                root: validation.sublocationNameError
                  ? classes.isValid
                  : classes.notValid,
              },
            }}
            onChange={e => onChange(e)}
            autoFocus
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

EditSublocation.propTypes = {
  updateSublocation: PropTypes.func.isRequired,
};

export default connect(null, { updateSublocation })(EditSublocation);
