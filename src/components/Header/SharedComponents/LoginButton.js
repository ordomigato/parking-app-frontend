import React, { useState } from "react";
import Modal from "../../Modal/ModalContainer";
import Login from "../../Auth/Login";

const LoginButton = ({ classes }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className={classes} onClick={(e) => setShowModal(true)}>
        Login
      </button>
      {showModal ? (
        <Modal setShowModal={setShowModal}>
          <Login />
        </Modal>
      ) : null}
    </div>
  );
};

export default LoginButton;
