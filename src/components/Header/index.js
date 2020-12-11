import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { default as DesktopProfileMenu } from "./Desktop/ProfileMenu";
import { default as DesktopNavItems } from "./Desktop/NavItems";
import { default as MobileNavItems } from "./Mobile/NavItems";
import LoginButton from "./SharedComponents/LoginButton";
import RegisterButton from "./SharedComponents/RegisterButton";
import Hamburger from "./Mobile/Hamburger";

const Navbar = ({ isAuthenticated }) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [navItems] = useState([
    { name: "Home", link: "/" },
    { name: "Parking Form", link: "/register-vehicle" },
  ]);
  const [profileItems] = useState([{ name: "Account", link: "/dashboard" }]);

  const handleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <DesktopNavItems navItems={navItems} />
            {isAuthenticated ? (
              <DesktopProfileMenu profileItems={profileItems} />
            ) : (
              <div className="flex justify-end space-x-4 hidden md:flex">
                <RegisterButton
                  classes={`px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:text-white hover:bg-gray-700`}
                />
                <LoginButton
                  classes={`px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700`}
                />
              </div>
            )}
            <Hamburger handleHamburger={handleHamburger} />
          </div>
        </div>
        <MobileNavItems
          hamburgerOpen={hamburgerOpen}
          navItems={navItems}
          profileItems={profileItems}
          isAuthenticated={isAuthenticated}
        />
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Navbar);
