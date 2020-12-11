import React from "react";
import { NavLink } from "react-router-dom";

const NavItems = ({ navItems }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 flex flex-row">
        <h1 className={`text-white`}>SKYVIEW SECURITY PARKING</h1>
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {navItems.map(item => (
            <NavLink
              exact
              activeClassName=" px-3 py-2 rounded-md text-sm bg-gray-900 font-medium text-gray-300 hover:bg-gray-700"
              className=" px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              to={item.link}
              key={item.link}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItems;
