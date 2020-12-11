import React from "react";
import { InputLabel, Select, MenuItem } from "@material-ui/core";

const Sublocations = ({ sublocations, sublocation, onChange }) => {
  return (
    <>
      <InputLabel>Select an Option</InputLabel>
      <Select
        label="Select an Option"
        name="sublocation"
        value={sublocation.id || ""}
        onChange={e => onChange(e)}
      >
        {sublocations
          ? sublocations.map(loc => (
              <MenuItem value={loc.id} key={loc.id}>
                {loc.name}
              </MenuItem>
            ))
          : "Seems like something went wrong"}
      </Select>
    </>
  );
};

export default Sublocations;
