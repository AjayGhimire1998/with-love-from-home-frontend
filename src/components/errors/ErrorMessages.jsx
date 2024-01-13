import React from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../../features/auth/customerSlice";
import { clearStoreError } from "../../features/auth/storeSlice";
import { clearMessages } from "../../features/home/ratingSlice";

function ErrorMessages({ error }) {

  const dispatch = useDispatch();

  const closePopUp = () => {
    const errorMessage = document.querySelector(".ui.error.message");
    errorMessage.classList.add("hidden");
    dispatch(clearMessages()) && dispatch(clearError()) && dispatch(clearStoreError());
  };

  // const closePopUp = () => {
  //   const errorMessage = document.querySelector(".ui.error.message");
  //   errorMessage.classList.add("hidden");
  // };
  return (
    <div className="ui container">
      <div
        className="ui error message"
        style={{ marginLeft: "70px", marginRight: "70px" }}
      >
        <i className="close icon" onClick={closePopUp}></i>
        <div className="header">
          {error?.map((err, index) => {
            return (
              <li key={index} style={{ textAlign: "left" }}>
                {err}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessages;
