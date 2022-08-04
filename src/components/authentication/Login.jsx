import React from "react";
import Omniauth from "./form-helpers/Omniauth";
import { useDispatch, useSelector } from "react-redux";
import { emailChange, passwordChange } from "../../features/auth/customerSlice";
import { useNavigate } from "react-router";
import { customerLogin } from "../../app/services/auth-services/auth-service";

function Login({ checkLoader }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = useSelector((store) => store.customer);
  const handleSubmit = (event) => {
    event.preventDefault();
    checkLoader();
    customerLogin(email, password);
    navigate("/home");
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
                onChange={(event) => dispatch(emailChange(event.target.value))}
              />
            </div>
            <div className="field">
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
          </form>
          <Omniauth />
          <br />
          <br />
          <br />
          <br />
          <button className="ui blue button" onClick={() => navigate("/store/login")}>
            Login as a Store
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
