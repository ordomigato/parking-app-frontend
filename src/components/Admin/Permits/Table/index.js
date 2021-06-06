import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Snackbar from "../../../Message/Snackbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { deletePermit, updatePermit } from "../../../../store/actions/permits";

const PermitsTable = ({ permits, deletePermit, updatePermit }) => {
  const [state, setState] = useState({
    columns: [
      {
        title: "ID",
        field: "id",
        editable: "never",
      },
      {
        title: "Location",
        field: "location.name",
        editable: "never",
      },
      { title: "Sublocation", field: "sublocation.name", editable: "never" },
      {
        title: "Unit",
        field: "unit",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      { title: "V. Plate", field: "vplate" },
      {
        title: "V. Make",
        field: "vmake",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      {
        title: "V. Model",
        field: "vmodel",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      {
        title: "V. Colour",
        field: "vcolor",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      {
        title: "User",
        field: "userId",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      { title: "First Name", field: "firstName" },
      {
        title: "Last Name",
        field: "lastName",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      {
        title: "Phone #",
        field: "phone",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      {
        title: "Email",
        field: "email",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      {
        title: "duration",
        field: "duration",
        editable: "never",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      {
        title: "Submitted",
        field: "createdAt",
        type: "datetime",
        hiddenByColumnsButton: true,
        hidden: true,
      },
      { title: "Expiry", field: "expDate", type: "datetime" },
    ],
    data: [],
    currentDate: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  const [snackbar, setSnackbar] = useState({
    message: "",
    isOpen: false,
  });

  const handleSnackbarClose = (event, reason) => {
    reason !== "clickaway" && setSnackbar({ message: "", isOpen: false });
  };

  useEffect(() => {
    const permitsArray = permits.map(permit => {
      const permitData = { ...permit };
      return permitData;
    });
    setState(s => ({ ...s, data: permitsArray }));
  }, [permits, setState]);

  return (
    <>
      <MaterialTable
        title="Parking Permits"
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
          rowStyle: rowData => {
            if (moment(state.currentDate).isAfter(rowData.expDate)) {
              return { backgroundColor: "rgba(252, 165, 165", color: "white" };
            }
            return {};
          },
        }}
        actions={[
          {
            tooltip: "Remove All Selected Permits",
            icon: "delete",
            onClick: (evt, data) => {
              const permitIds = data.map(permit => permit.id);
              deletePermit(permitIds)
                .then(res =>
                  setSnackbar({ message: res.data.message[0], isOpen: true })
                )
                .catch(err => console.log(err));
            },
          },
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              console.log(newData);
              updatePermit(newData)
                .then(res => {
                  setSnackbar({
                    message: res.data.message[0],
                    isOpen: true,
                  });
                  return resolve();
                })
                .catch(err => console.log(err));
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

PermitsTable.propTypes = {
  deletePermit: PropTypes.func.isRequired,
  updatePermit: PropTypes.func.isRequired,
};

export default connect(null, { deletePermit, updatePermit })(PermitsTable);
