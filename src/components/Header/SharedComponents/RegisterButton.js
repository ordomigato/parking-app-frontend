import React, { useState } from "react";
import Modal from "../../Modal/ModalContainer";
import Register from "../../Auth/Register";

const RegisterButton = ({ classes }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className={classes} onClick={(e) => setShowModal(true)}>
        Register
      </button>
      {showModal ? (
        <Modal setShowModal={setShowModal}>
          <Register />
        </Modal>
      ) : null}
    </div>
  );
};

export default RegisterButton;
