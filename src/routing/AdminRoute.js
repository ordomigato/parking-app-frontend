import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({
  component: Component,
  auth: { isAdmin, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAdmin && !loading ? (
        <Redirect to="/" />
      ) : (
        !loading && <Component {...props} />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
