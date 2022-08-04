import React from "react";
import Omniauth from "./form-helpers/Omniauth";
import { useDispatch, useSelector } from "react-redux";
import {
  fullNameChange,
  emailChange,
  passwordChange,
  passwordConfirmationChange,
} from "../../features/auth/customerSlice";
import { customerSignUp } from "../../app/services/auth-services/auth-service";
import { useNavigate } from "react-router-dom";

function SignUp({checkLoader}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fullName, email, password, passwordConfirmation } = useSelector(
    (store) => store.customer
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    checkLoader();
    customerSignUp(fullName, email, password, passwordConfirmation);
    navigate('/home')
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
          <form className="ui form " onSubmit={handleSubmit}>
            <div className="field ">
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
            <div className="field ">
              <label style={{ textAlign: "left" }}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={(event) =>
                  dispatch(emailChange(event.target.value))
                }
              />
            </div>
            <div className="field">
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
            <div className="field ">
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
            <br />
          </form>
          <Omniauth />
        </div>
      </div>
    </>
  );
}

export default SignUp;
