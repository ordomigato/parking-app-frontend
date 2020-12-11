import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLocations } from "../../../store/actions/locations";

import { InputLabel, Select, MenuItem } from "@material-ui/core";

const Locations = ({ location, onChange, getLocations, locations }) => {
  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <>
      <InputLabel>Select Location</InputLabel>
      <Select
        label="Select Location"
        name="location"
        value={location.id}
        onChange={e => onChange(e)}
      >
        {locations && locations.length > 0
          ? locations.map(loc => (
              <MenuItem value={loc.id} key={loc.id}>
                {loc.name}
              </MenuItem>
            ))
          : "Seems like we can't grab any locations"}
      </Select>
    </>
  );
};

Locations.propTypes = {
  getLocations: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  locations: state.locations.data,
});

export default connect(mapStateToProps, { getLocations })(Locations);
