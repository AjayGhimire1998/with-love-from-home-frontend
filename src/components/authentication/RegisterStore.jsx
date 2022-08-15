import React from "react";
import Dropdown from "./form-helpers/Dropdown";
import StoreLogo from "./form-helpers/StoreLogo";
import { useDispatch, useSelector } from "react-redux";
import {
  nameChanger,
  logoChanger,
  categoryIdChanger,
  emailChanger,
  passwordChanger,
  passwordConfirmationChanger,
} from "../../features/auth/storeSlice";
import { storeSignUp } from "../../app/services/auth-services/auth-service";
import { useNavigate } from "react-router-dom";
import { setStoreId } from "../../features/dashboard/dashboardSlice";
import Navbar from "../nav/Navbar";

function RegisterStore({ checkLoader }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    categoryItems,
    name,
    logo,
    categoryId,
    email,
    password,
    passwordConfirmation,
  } = useSelector((store) => store.store);

  const handleSubmit = (event) => {
    event.preventDefault();
    checkLoader(2000);
    // console.log("after click:", logo)
    storeSignUp(name, logo, categoryId, email, password, passwordConfirmation);
    navigate("/");
  };
  console.log(logo);
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
              <label style={{ textAlign: "left" }}>Store Name</label>
              <input
                type="text"
                placeholder="Give Your Store Name "
                onChange={(event) => dispatch(nameChanger(event.target.value))}
              />
            </div>
            <div className="field">
              <label style={{ textAlign: "left" }}>
                Select Store's category
              </label>
              <Dropdown categoryItems={categoryItems} categoryId={categoryId} />
              <br />
            </div>
            <StoreLogo checkLoader={checkLoader} />

            <br />
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
            <div className="field ">
              <label style={{ textAlign: "left" }}>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Password Again"
                onChange={(event) =>
                  dispatch(passwordConfirmationChanger(event.target.value))
                }
              />
            </div>
            <button className="ui green button" type="submit">
              Register
            </button>
            <br />
            <br />
            <br />
            <br />
            <button
              className="ui blue button"
              onClick={() => navigate("/signup")}
            >
              SignUp as a Customer
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterStore;
