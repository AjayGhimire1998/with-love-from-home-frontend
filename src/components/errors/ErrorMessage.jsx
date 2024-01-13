import React from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../../features/auth/customerSlice";
import { clearStoreError } from "../../features/auth/storeSlice";
import { clearMessages } from "../../features/home/ratingSlice";

function ErrorMessage({ error, success, warning }) {
  const dispatch = useDispatch();

  const closePopUp = () => {
    const errorMessage = document.querySelector(".ui.message");
    errorMessage.classList.add("hidden");
    dispatch(clearMessages()) && dispatch(clearError()) && dispatch(clearStoreError());
    
    setTimeout(() => {
      errorMessage.classList.remove("hidden");
    }, 1000);
  };

  return (
    <div className="ui container">
      <div
        className={
          error
            ? "ui center aligned error message"
            : success
            ? "ui center aligned success message"
            : warning
            ? "ui center aligned warning message"
            : "ui center aligned teal message"
        }
      >
        <i className="close icon" onClick={closePopUp}></i>
        <div className="header">{error || success || warning}</div>
      </div>
    </div>
  );
}

export default ErrorMessage;
