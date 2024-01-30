import React, { useEffect } from "react";
import Omniauth from "./form-helpers/Omniauth";
import { useDispatch, useSelector } from "react-redux";
import {
  fullNameChange,
  emailChange,
  passwordChange,
  passwordConfirmationChange,
  setError,
} from "../../features/auth/customerSlice";
import { customerSignUp } from "../../app/services/auth-services/auth-service";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "../errors/ErrorMessages";

function SignUp({ checkLoader }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fullName, email, password, passwordConfirmation, error } =
    useSelector((store) => store.customer);

  useEffect(() => {
    dispatch(setError(JSON.parse(localStorage.getItem("signup_error"))));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // checkLoader(2000);
    customerSignUp(fullName, email, password, passwordConfirmation);
    if(localStorage.getItem("user")){
      navigate("/")
    } else {
      navigate("/signup")
    }
    // navigate("/");
  };
  return (
    <>
      <br />
      <br />
      {error && <ErrorMessages error={error} />}
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
          <form className="ui form " onSubmit={handleSubmit}>
            <div className="required field">
              <label style={{ textAlign: "left" }}>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                onChange={(event) =>
                  dispatch(fullNameChange(event.target.value))
                }
              />
            </div>
            <div className="required field">
              <label style={{ textAlign: "left" }}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={(event) => dispatch(emailChange(event.target.value))}
              />
            </div>
            <div className="required field">
              <label style={{ textAlign: "left" }}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(event) =>
                  dispatch(passwordChange(event.target.value))
                }
              />
            </div>
            <div className="required field">
              <label style={{ textAlign: "left" }}>Confirm Password</label>
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Enter Password Again"
                onChange={(event) =>
                  dispatch(passwordConfirmationChange(event.target.value))
                }
              />
            </div>
            <button className="ui green button" type="submit">
              Sign Up
            </button>
            <br />
          </form>
          <br />
          <br />
          {/* <Omniauth />
          <br />
          <br />
          <br /> */}
          {/* <br /> */}
          <button
            className="ui blue button"
            onClick={() => navigate("/store/signup")}
          >
            Register Your Store
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
