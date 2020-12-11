import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLocations } from "../../../store/actions/locations";
import LocationsTable from "./Table";

const Locations = ({ locations: { data, loading }, getLocations }) => {
  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <>
      <div className="m-4">
        <LocationsTable locations={data} />
      </div>
    </>
  );
};

Locations.propTypes = {
  getLocations: PropTypes.func.isRequired,
  locations: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  locations: state.locations,
});

export default connect(mapStateToProps, { getLocations })(Locations);
