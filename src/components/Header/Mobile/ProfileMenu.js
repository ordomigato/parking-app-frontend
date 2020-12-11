import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/auth";

const ProfileMenu = ({ profileItems, auth, logout }) => {
  return (
    <div className="pt-4 pb-3 border-t border-gray-700">
      <div className="flex items-center px-5">
        <div className="">
          <div className="text-base font-medium leading-none text-white">
            {auth.user.firstName}
          </div>
          <div className="text-sm font-medium leading-none text-gray-400">
            {auth.user.email}
          </div>
        </div>
      </div>
      <div className="mt-3 px-2 space-y-1">
        {profileItems.map((item) => (
          <NavLink
            activeClassName="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            to={item.link}
            key={item.link}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
          >
            {item.name}
          </NavLink>
        ))}
        {auth.isAdmin && (
          <NavLink
            activeClassName="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            to={`/admin`}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
          >
            Admin Dashboard
          </NavLink>
        )}
        <button
          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
          onClick={(e) => logout()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

ProfileMenu.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(ProfileMenu);
