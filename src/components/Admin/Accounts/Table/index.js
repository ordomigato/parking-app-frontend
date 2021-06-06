import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Snackbar from "../../../Message/Snackbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { deleteUsers, updateUsers } from "../../../../store/actions/users";

const AccountsTable = ({ users, deleteUsers, updateUsers }) => {
  const [state, setState] = useState({
    columns: [
      {
        title: "ID",
        field: "id",
        editable: "never",
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
    const usersArray = users.map((user) => {
      const userData = { ...user };
      return userData;
    });
    setState((s) => ({ ...s, data: usersArray }));
  }, [users, setState]);

  return (
    <>
      <MaterialTable
        title="Parking users"
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
          rowStyle: (rowData) => {
            if (moment(state.currentDate).isAfter(rowData.expDate)) {
              return { backgroundColor: "rgba(252, 165, 165", color: "white" };
            }
            return {};
          },
        }}
        actions={
          [
            // {
            //   tooltip: "Remove All Selected users",
            //   icon: "delete",
            //   onClick: (evt, data) => {
            //     const permitIds = data.map((permit) => permit.id);
            //     deleteUsers(permitIds)
            //       .then((res) =>
            //         setSnackbar({ message: res.data.message[0], isOpen: true })
            //       )
            //       .catch((err) => console.log(err));
            //   },
            // },
          ]
        }
        editable={
          {
            // onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve) => {
            //     console.log(newData);
            //     updateUsers(newData)
            //       .then((res) => {
            //         setSnackbar({
            //           message: res.data.message[0],
            //           isOpen: true,
            //         });
            //         return resolve();
            //       })
            //       .catch((err) => console.log(err));
            //   }),
          }
        }
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

AccountsTable.propTypes = {
  deleteUsers: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired,
};

export default connect(null, { deleteUsers, updateUsers })(AccountsTable);
