import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { emailChanger, passwordChanger } from "../../features/auth/storeSlice";
import { useNavigate } from "react-router";
import {
  getStore,
  storeLogin,
} from "../../app/services/auth-services/auth-service";
import { setStore } from "../../features/dashboard/dashboardSlice";

function Login({ checkLoader }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = useSelector((store) => store.store);

  const handleSubmit = (event) => {
    event.preventDefault();
    checkLoader();
    storeLogin(email, password);
    navigate("/dashboard");
  };
  return (
    <>
      <br />
      <br />
      <br />
      <div style={{ display: "table", height: "100%", margin: "0 auto" }}>
        <br />
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
          }}
        >
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field ">
              <label style={{ textAlign: "left" }}>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(event) => dispatch(emailChanger(event.target.value))}
              />
            </div>
            <div className="field">
              <label style={{ textAlign: "left" }}>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(event) =>
                  dispatch(passwordChanger(event.target.value))
                }
              />
            </div>
            <button className="ui green  button" type="submit">
              Login
            </button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
