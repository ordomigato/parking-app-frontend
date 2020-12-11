import React, { useState } from "react";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import EditInfo from "./EditInfo";
import ChangePassword from "./ChangePassword";
import Modal from "../../Modal/ModalContainer";
import { Button } from "@material-ui/core";

const Entry = ({ name, value }) => {
  return (
    <div className="w-full">
      <p className="w-full flex">
        <span className="mr-auto">{name}: </span>
        {value ? <span>{value}</span> : "-"}
      </p>
    </div>
  );
};

const AccountInfo = ({ auth: { loading, user } }) => {
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  return (
    <div>
      {showUpdateUserModal && (
        <Modal setShowModal={setShowUpdateUserModal}>
          <EditInfo />
        </Modal>
      )}
      {!loading && (
        <div className="lg:w-1/3 w-full">
          <div className="flex justify-between content-center">
            <h2 className="font-medium text-lg">Main Account Info </h2>
            <div className="ml-auto">
              <IconButton
                aria-label="edit"
                size="small"
                onClick={(e) => setShowUpdateUserModal(true)}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </div>
          </div>
          <div>
            <p>Personal Information</p>
            <Entry name="First Name" value={user.firstName} />
            <Entry name="Last Name" value={user.lastName} />
            <Entry name="Phone Number" value={user.defaultPhone} />
            <Entry name="Email" value={user.email} />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={(e) => setShowChangePasswordModal(true)}
              color="secondary"
              variant="contained"
              size="small"
            >
              Change Password
            </Button>
          </div>
          {showChangePasswordModal && (
            <Modal setShowModal={setShowChangePasswordModal}>
              <ChangePassword />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AccountInfo);
