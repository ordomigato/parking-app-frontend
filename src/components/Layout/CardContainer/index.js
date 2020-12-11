import React from "react";

const CardContainer = ({ children }) => {
  return (
    <div className="w-full">
      <div className="m-4 p-10 shadow-md">{children}</div>
    </div>
  );
};

export default CardContainer;
