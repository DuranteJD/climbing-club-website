import Link from "next/link";
import React from "react";

const Modal = () => {
  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Notifications</h3>
          <p className="py-4">
            Welcome to the new Temple Climbing Club website!
          </p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};

export default Modal;
