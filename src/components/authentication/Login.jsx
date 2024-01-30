import React from "react";
import Omniauth from "./form-helpers/Omniauth";
import { useDispatch, useSelector } from "react-redux";
import {
  emailChange,
  passwordChange,
  setError,
} from "../../features/auth/customerSlice";
import { useNavigate } from "react-router";
import { customerLogin } from "../../app/services/auth-services/auth-service";
import { useEffect } from "react";
import ErrorMessage from "../errors/ErrorMessage";

function Login({ checkLoader }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((store) => store.customer);

  useEffect(() => {
   
    dispatch(setError(JSON.parse(localStorage.getItem("login_error"))));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // checkLoader(2000);
    customerLogin(email, password);

    if(localStorage.getItem("user")){
      navigate("/")
    } else {
      navigate("/login")
    }
    // navigate("/");
  };
  return (
    <>
      <br />
      <br />
      {error && <ErrorMessage error={error} />}
      {/* {error && <ErrorMessage warning={error} />} */}
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
          <h3>Login as a customer</h3>
          <br />
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="required field">
              <label style={{ textAlign: "left" }}>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(event) => dispatch(emailChange(event.target.value))}
              />
            </div>
            <div className="required field">
              <label style={{ textAlign: "left" }}>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(event) =>
                  dispatch(passwordChange(event.target.value))
                }
              />
            </div>
            <button className="ui green  button" type="submit">
              Login
            </button>
            <br />
            <br />
            <br />
          </form>
          {/* <Omniauth />
          <br />
          <br /> */}
          <a href="/reset_user">Forgot Your Password?</a>
          <br />
          <br />
          <br />
          <button
            className="ui blue button"
            onClick={() => navigate("/store/login")}
          >
            Login as a Store
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
