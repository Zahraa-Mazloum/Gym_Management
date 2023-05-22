import React from "react";
import { ToastContainer } from "react-toastify";
import "./confirmationPopup.css";

export default function ConfirmationPopup(props) {
  function closePopup() {
    document.querySelector("#modal").close();
  }

  return (
    <dialog className="confirmation-popup" id="modal">
      <p>Are you sure you want to delete?</p>
      <div>
        <button
          id="confirmation-delete-btn"
          onClick={() => {
            props.handleDelete(props.id);
            closePopup();
          }}
        >
          Delete
        </button>
        <button onClick={closePopup}>Cancel</button>
      </div>
      <ToastContainer />
    </dialog>
  );
}
