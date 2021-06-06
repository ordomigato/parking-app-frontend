import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import StreetviewIcon from "@material-ui/icons/Streetview";
import DetailsPanel from "./DetailsPanel";
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
      { title: "ID", field: "id", hidden: true },
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
    isError: false,
    isOpen: false,
  });

  const handleSnackbarClose = (event, reason) => {
    reason !== "clickaway" && setSnackbar({ message: "", isOpen: false });
  };

  useEffect(() => {
    const locationsArray = locations.map(location => {
      const locationData = { ...location };
      return locationData;
    });
    setState(s => ({ ...s, data: locationsArray }));
  }, [locations, setState]);

  return (
    <>
      <MaterialTable
        title="Parking Locations"
        columns={state.columns}
        detailPanel={[
          {
            icon: StreetviewIcon,
            tooltip: "Steet Names / Sublocations",
            render: rowData => {
              return <DetailsPanel locationData={rowData} />;
            },
          },
        ]}
        data={state.data}
        style={{}}
        options={{
          columnsButton: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100],
          exportButton: true,
          actionsColumnIndex: -1,
        }}
        localization={{
          body: {
            editRow: {
              deleteText:
                "CAUTION: Deleting a location cannot be undone and may cause issues with saved permits",
            },
          },
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              updateLocation(newData)
                .then(res => {
                  if (!res.data.success) {
                    res.data.errors[0].msg
                      ? setSnackbar({
                          message: res.data.errors[0].msg,
                          isError: true,
                          isOpen: true,
                        })
                      : setSnackbar({
                          message: "Something went wrong",
                          isError: true,
                          isOpen: true,
                        });
                  } else {
                    setSnackbar({
                      message: res.data.message[0],
                      isError: false,
                      isOpen: true,
                    });
                  }
                  return resolve();
                })
                .catch(err => {
                  console.log(err);
                });
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              deleteLocation([oldData.id])
                .then(res => {
                  setSnackbar({ message: res.data.message[0], isOpen: true });
                  return resolve();
                })
                .catch(err => console.log(err));
            }),
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              addLocation(newData)
                .then(res => {
                  setSnackbar({
                    message: res.data.message[0],
                    isOpen: true,
                  });
                  return resolve();
                })
                .catch(err => {
                  console.log(err);
                  setSnackbar({
                    message: err.data.errors[0].msg || "Something went wrong",
                    isError: true,
                    isOpen: true,
                  });
                  return reject();
                });
            }),
        }}
      />
      <Snackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        severity={snackbar.isError ? "error" : "success"}
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
