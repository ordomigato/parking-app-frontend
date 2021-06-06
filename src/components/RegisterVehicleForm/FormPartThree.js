import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { updateVRFormData } from "../../store/actions/registerFormData";
import { updateSelectedLocation } from "../../store/actions/registerFormData";
import { checkField, checkAllFields } from "../../utils/validate";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  isValid: {
    visibility: "hidden",
  },
  notValid: {
    visibility: "block",
  },
});

const FormPartThree = ({
  formData: { location, sublocation, unit, duration },
  updateVRFormData,
  locations,
  loading,
  setNextButtonState,
  updateSelectedLocation,
  selectedLocation,
}) => {
  const classes = useStyles();
  const [validation, setValidation] = useState({
    locationError: true,
    sublocationError: true,
    unitError: true,
    durationError: true,
  });
  const [currentTime] = useState(moment().format("YYYY-MM-DD"));

  // Return name and id for location and sublocation
  const getFieldNameAndId = (key, value) => {
    switch (key) {
      case "location":
        // find location from within array of locations
        const locationObject = locations.find((place) => place.id === value);
        // set found location as the current location
        updateSelectedLocation(locationObject);
        // reset sublocation data from from state
        updateVRFormData({
          key: "sublocation",
          value: { id: "", name: "" },
        });
        // return name and id
        return { key, value: { id: value, name: locationObject.name } };
      case "sublocation":
        // find sublocation from currently selected location
        const sublocationObject = selectedLocation.sublocations.find(
          (place) => place.id === value
        );
        return { key, value: { id: value, name: sublocationObject.name } };
      default:
        return { key, value };
    }
  };

  const onChange = (e) => {
    // update form
    const { name, value } = e.target;
    const newData = getFieldNameAndId(name, value);
    updateVRFormData(newData);
    // check current field
    const isValid = checkField(value, name);
    const validationStateKey = `${name}Error`;
    setValidation({ ...validation, [validationStateKey]: isValid });
  };

  useEffect(() => {
    let fields = { location, unit };
    // if no locations exist, return
    if (!location) return;
    // check if fields are required
    if (selectedLocation) {
      if (Object.keys(selectedLocation).length !== 0) {
        selectedLocation.sublocations.length !== 0
          ? (fields = { ...fields, sublocation })
          : null;
        selectedLocation.maxFormDuration
          ? (fields = { ...fields, duration })
          : null;
      }
    }
    const allValid = checkAllFields(fields);
    setNextButtonState(allValid);
  }, [location, sublocation, duration, unit]);

  return (
    <>
      {locations.length > 0 && !loading ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select Location</InputLabel>
              <Select
                label="Select Location"
                name="location"
                value={location.id}
                onChange={(e) => onChange(e)}
              >
                {locations.map((loc) => (
                  <MenuItem value={loc.id} key={loc.id}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {selectedLocation && selectedLocation.sublocations.length > 0 ? (
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Select an Option</InputLabel>
                <Select
                  label="Select an Option"
                  name="sublocation"
                  value={sublocation.id || ""}
                  error={!validation.sublocationError}
                  required
                  onChange={(e) => onChange(e)}
                >
                  {selectedLocation.sublocations
                    ? selectedLocation.sublocations.map((loc) => (
                        <MenuItem value={loc.id} key={loc.id}>
                          {loc.name}
                        </MenuItem>
                      ))
                    : "Seems like something went wrong"}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={6}>
            <TextField
              color="secondary"
              label="Unit Number Visiting"
              variant="outlined"
              name="unit"
              type="text"
              fullWidth
              value={unit}
              error={!validation.unitError}
              helperText="Please enter the unit number you are visiting"
              FormHelperTextProps={{
                classes: {
                  root: validation.unitError
                    ? classes.isValid
                    : classes.notValid,
                },
              }}
              required
              onChange={(e) => onChange(e)}
            />
          </Grid>
          {selectedLocation && (
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-filled-label">
                  Duration
                </InputLabel>
                <Select
                  label="Duration"
                  name="duration"
                  value={duration}
                  onChange={(e) => onChange(e)}
                >
                  {Array.from(
                    { length: selectedLocation.maxFormDuration + 1 },
                    (v, i) => (
                      <MenuItem key={i} value={i}>
                        {i === 0 ? (
                          <span>Just the Day</span>
                        ) : i === 1 ? (
                          <span>{`${i} night`}</span>
                        ) : (
                          <span>{`${i} nights`}</span>
                        )}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p>No locations were found</p>
          </Grid>
        </Grid>
      )}
    </>
  );
};

FormPartThree.propTypes = {
  updateVRFormData: PropTypes.func.isRequired,
  updateSelectedLocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  formData: state.registerVRFormData.formData,
  locations: state.locations.data,
  loading: state.locations.loading,
  selectedLocation: state.registerVRFormData.selectedLocation,
});

export default connect(mapStateToProps, {
  updateVRFormData,
  updateSelectedLocation,
})(FormPartThree);
