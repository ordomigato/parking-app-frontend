import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Snackbar from "../../../Message/Snackbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addLocation,
  deleteLocation,
  updateLocation,
} from "../../../../store/actions/locations";

const LocationsTable = ({
  locations,
  deleteLocation,
  updateLocation,
  addLocation,
}) => {
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

  const [snackbar, setSnackbar] = useState({
    message: "",
    isOpen: false,
  });

  const handleSnackbarClose = (event, reason) => {
    reason !== "clickaway" && setSnackbar({ message: "", isOpen: false });
  };

  useEffect(() => {
    const locationsArray = locations.map((location) => {
      const locationData = { ...location };
      return locationData;
    });
    setState((s) => ({ ...s, data: locationsArray }));
  }, [locations, setState]);

  return (
    <>
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
              deleteLocation(dataIds)
                .then((res) =>
                  setSnackbar({ message: res.data.message[0], isOpen: true })
                )
                .catch((err) => console.log(err));
            },
          },
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              updateLocation(newData)
                .then((res) => {
                  setSnackbar({
                    message: res.data.message[0],
                    isOpen: true,
                  });
                  return resolve();
                })
                .catch((err) => console.log(err));
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              addLocation(newData)
                .then((res) => {
                  console.log(res.data);
                  setSnackbar({
                    message: res.data.message[0],
                    isOpen: true,
                  });
                  return resolve();
                })
                .catch((err) => console.log(err));
            }),
        }}
      />
      <Snackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        severity={"success"}
        hideDuration={3000}
        handleClose={handleSnackbarClose}
      />
    </>
  );
};

LocationsTable.propTypes = {
  deleteLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  addLocation: PropTypes.func.isRequired,
};

export default connect(null, { deleteLocation, updateLocation, addLocation })(
  LocationsTable
);
