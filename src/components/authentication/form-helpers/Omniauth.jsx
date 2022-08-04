import React from "react";
import "./omniauth.css";

function Omniauth() {
  return (
    <div>
      <button className="loginBtn loginBtn--facebook">
        Login with Facebook
      </button>
      <br />
      <button className="loginBtn loginBtn--google">Login with Google</button>
    </div>
  );
}

export default Omniauth;
