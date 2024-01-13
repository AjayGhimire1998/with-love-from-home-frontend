import React from "react";

function ErrorMessages({ error }) {
  const closePopUp = () => {
    const errorMessage = document.querySelector(".ui.error.message");
    errorMessage.classList.add("hidden");
  };
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
