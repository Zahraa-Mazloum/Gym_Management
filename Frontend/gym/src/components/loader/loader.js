import "./loader.css";
import React from "react";

function Loader() {
  function openPopup() {
    document.querySelector(".employee-popup").showModal();
  }
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
