import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  emailChanger,
  passwordChanger,
  setError,
} from "../../features/auth/storeSlice";
import { useNavigate } from "react-router";
import { storeLogin } from "../../app/services/auth-services/auth-service";
import ErrorMessage from "../errors/ErrorMessage";

function Login({ checkLoader }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((store) => store.store);

  useEffect(() => {
    dispatch(setError(JSON.parse(localStorage.getItem("store_login_error"))));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // checkLoader(2000);
    storeLogin(email, password);
    if(localStorage.getItem("store")){
      navigate("/")
    } else {
      navigate("/store/login")
    }
  };

  const handleGuestLogin = (event) => {
    event.preventDefault();
    storeLogin("iamgueststore@gmail.com", "Store123")
    if(localStorage.getItem("store")){
      navigate("/")
    } else {
      navigate("/store/login")
    }
  }
  return (
    <>
      <br />
      <br />
      {error && <ErrorMessage error={error} />}
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
          <h3>Login as a store</h3>
          <br />
          <form className="ui form" >
            <div className=" required field ">
              <label style={{ textAlign: "left" }}>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(event) => dispatch(emailChanger(event.target.value))}
              />
            </div>
            <div className="required field">
              <label style={{ textAlign: "left" }}>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(event) =>
                  dispatch(passwordChanger(event.target.value))
                }
              />
            </div>
            <button className="ui green  button" type="submit" onClick={handleSubmit}>
              Login
            </button>
            <br/>
            <small>or</small>
            <br/>
            <button className="ui purple button small" type="submit" onClick={handleGuestLogin}>
              Quick Guest Login
            </button>
            <br />
          <br />
          <a href="/reset_store">Forgot Your Password?</a>
          <br />
          <br />
          <br />
            <button
              className="ui blue button"
              onClick={() => navigate("/login")}
            >
              Login as a Customer
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
