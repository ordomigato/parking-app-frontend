import React from "react";

export default function Modal({ setShowModal, title, children }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          onClick={e => setShowModal(false)}
          className="z-40 absolute inset-0"
        ></div>
        <div className="relative w-auto my-6 mx-auto max-w-3xl z-50">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none z-50">
            {/*body*/}
            <div className="pb-6">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
