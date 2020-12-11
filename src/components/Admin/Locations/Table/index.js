import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteLocation,
  updateLocation,
} from "../../../../store/actions/locations";

const LocationsTable = ({ locations, deleteLocation, updateLocation }) => {
  const [state, setState] = useState({
    columns: [
      { title: "ID", field: "id", editable: "never" },
      {
        title: "Location",
        field: "name",
      },
      {
        title: "MAX. Form Duration",
        field: "maxFormDuration",
      },
      {
        title: "MAX. Monthly Duration",
        field: "maxMonthlyDuration",
      },
    ],
    data: [],
  });

  useEffect(() => {
    const locationsArray = locations.map((location) => {
      const locationData = { ...location };
      return locationData;
    });
    setState((s) => ({ ...s, data: locationsArray }));
  }, [locations, setState]);

  return (
    <MaterialTable
      title="Parking Locations"
      columns={state.columns}
      data={state.data}
      style={{}}
      options={{
        columnsButton: true,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        exportButton: true,
        actionsColumnIndex: -1,
        selection: true,
      }}
      actions={[
        {
          tooltip: "Remove All Selected Locations",
          icon: "delete",
          onClick: (evt, data) => {
            const dataIds = data.map((location) => location.id);
            deleteLocation(dataIds);
          },
        },
      ]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            updateLocation(newData)
              .then(() => resolve())
              .catch((err) => console.log(err));
            if (oldData) {
              setState((prevState) => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                return { ...prevState, data };
              });
            }
          }),
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              setState({ ...state, data: [...state.data, newData] });
              resolve();
            }, 1000);
          }),
      }}
    />
  );
};

LocationsTable.propTypes = {
  deleteLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
};

export default connect(null, { deleteLocation, updateLocation })(
  LocationsTable
);
