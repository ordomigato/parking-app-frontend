import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({
  component: Component,
  auth: { user, loading },
  permittedRoles,
  ...rest
}) => {
  return (
    <>
      {user && (
        <Route
          {...rest}
          render={props =>
            !permittedRoles.includes(user.role) && !loading ? (
              <Redirect to="/" />
            ) : (
              !loading && <Component {...props} />
            )
          }
        />
      )}
    </>
  );
};

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
