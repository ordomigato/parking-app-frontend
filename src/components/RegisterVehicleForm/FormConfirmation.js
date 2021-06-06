import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Grid } from "@material-ui/core";

const FormConfirmation = ({
  formData: {
    location,
    sublocation,
    unit,
    duration,
    firstName,
    lastName,
    email,
    defaultPhone,
    vplate,
    // vmodel,
    // vmake,
    vcolor,
  },
  selectedLocation,
}) => {
  const [locationInfo, setLocationInfo] = useState("");
  const [currentTime] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    if (sublocation === "") {
      setLocationInfo(location);
    } else {
      setLocationInfo(`${location.name} / ${sublocation.name}`);
    }
  }, []);

  return (
    <Grid container spacing={3} component={`div`}>
      <Grid item xs={12} sm={6}>
        <h4>Personal Information</h4>
        <div>
          <Entry label="First Name" value={firstName} />
          <Entry label="Last Name" value={lastName} />
          <Entry label="Email" value={email} />
          <Entry label="Phone" value={defaultPhone} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <h4>Vehicle Information</h4>
        <div>
          <Entry label="Plate #" value={vplate} />
          <Entry label="Colour" value={vcolor} />
          {/* <Entry label="Make" value={vmake} />
          <Entry label="Model" value={vmodel} /> */}
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <h4>Visiting Information</h4>
        <div>
          <Entry label="Location" value={locationInfo} />
          <Entry label="Visiting Unit" value={unit} />
          <Entry label="Duration" value={duration} />
          <Entry
            label="Permit Expiration"
            value={moment(currentTime + " " + selectedLocation.curfewReset)
              .add(duration, "days")
              .format("MMMM Do YYYY, h:mm a")}
          />
        </div>
      </Grid>
    </Grid>
  );
};

const Entry = ({ label, value }) => (
  <>
    <span>
      <strong>{label}</strong>: {value}
    </span>
    <br />
  </>
);

const mapStateToProps = (state) => ({
  formData: state.registerVRFormData.formData,
  selectedLocation: state.registerVRFormData.selectedLocation,
});

export default connect(mapStateToProps)(FormConfirmation);
