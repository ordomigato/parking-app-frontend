import React from "react";
import ProfileMenu from "./ProfileMenu";
import { NavLink } from "react-router-dom";
import LoginButton from "../SharedComponents/LoginButton";
import RegisterButton from "../SharedComponents/RegisterButton";

const NavItems = ({
  hamburgerOpen,
  navItems,
  profileItems,
  isAuthenticated,
}) => {
  return (
    <div className={`${hamburgerOpen ? "block" : "hidden"} md:hidden`}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navItems.map((item) => (
          <NavLink
            exact
            activeClassName="block px-3 py-2 rounded-md text-sm bg-gray-900 font-medium text-gray-300 hover:bg-gray-700"
            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            to={item.link}
            key={item.link}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      {isAuthenticated ? (
        <ProfileMenu profileItems={profileItems} />
      ) : (
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <RegisterButton
            classes={`w-full px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:text-white hover:bg-gray-700`}
          />
          <LoginButton
            classes={`w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700`}
          />
        </div>
      )}
    </div>
  );
};

export default NavItems;
