import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPermits } from "../../../store/actions/permits";
import PermitsTable from "./Table";

const PermitsPage = ({ permits: { permits, loading }, getPermits }) => {
  useEffect(() => {
    getPermits();
  }, [getPermits]);

  return (
    <>
      <div className="m-4">
        <PermitsTable permits={permits} />
      </div>
    </>
  );
};

PermitsPage.propTypes = {
  getPermits: PropTypes.func.isRequired,
  permits: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  permits: state.permits,
});

export default connect(mapStateToProps, { getPermits })(PermitsPage);
