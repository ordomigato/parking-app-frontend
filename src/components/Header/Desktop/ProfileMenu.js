import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../../store/actions/auth";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const ProfileMenu = ({ auth, profileItems, logout }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const history = useHistory();

  const handleLogout = () => {
    history.push("/");
    logout();
  };

  return (
    <div className="hidden md:block z-40">
      <div className="ml-4 flex items-center md:ml-6">
        <p className="text-gray-400">Hello, {auth.user.firstName}</p>
        {/* Profile Dropdown */}
        <div
          className="ml-3 relative"
          onFocus={e => {
            if (e.currentTarget === e.target) {
              setProfileMenuOpen(true);
            } else {
              setProfileMenuOpen(true);
            }
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setProfileMenuOpen(true);
            }
          }}
          onBlur={e => {
            if (e.currentTarget === e.target) {
              setProfileMenuOpen(true);
            } else {
              setProfileMenuOpen(true);
            }
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setProfileMenuOpen(false);
            }
          }}
        >
          <div>
            <button
              className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <AccountCircleOutlinedIcon className="text-gray-400 hover:text-white" />
            </button>
          </div>
          <div
            className={`${
              profileMenuOpen ? "block" : "hidden"
            } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            {profileItems.map(item => (
              <NavLink
                activeClassName="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                to={item.link}
                key={item.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={e => setProfileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            {[1, 2].includes(auth.user.role) && (
              <NavLink
                activeClassName="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                to={`/admin`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={e => setProfileMenuOpen(false)}
              >
                Admin Dashboard
              </NavLink>
            )}
            <button
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={e => handleLogout()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileMenu.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(ProfileMenu);
