import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  emailChanger,
  passwordChanger,
  passwordConfirmationChanger,
  setError,
  setTokken,
} from "../../features/auth/storeSlice";
import ErrorMessage from "../errors/ErrorMessage";

function ResetStorePasswordForm({ checkLoader }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tokken, email, password, passwordConfirmation, error } = useSelector(
    (store) => store.store
  );

  const data = {
    token: tokken,
    email: email,
    password: password,
    password_confirmation: passwordConfirmation,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      dispatch(setError("Password does not match."));
    } else {
      fetch(`${API_URL}passwords/reset_store_password`, {
        mode: "cors",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.alert) {
            dispatch(setError(response.alert));
          } else {
            dispatch(setError(response.error));
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <>
        <br />
        <br />
        {error && <ErrorMessage warning={error} />}
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
            {error === "Your password has been successfuly reset!" ? (
              <button
                className="ui huge yellow button "
                onClick={() => navigate("/store/login")}
              >
                <span style={{ color: "black" }}>Go to Login</span>{" "}
                <i className="right arrow icon black"></i>
              </button>
            ) : (
              <>
                <h3>Store password reset:</h3>
                <br />
                <form
                  className="ui form"
                  onSubmit={(e) => {
                    checkLoader(2000);
                    handleSubmit(e);
                  }}
                >
                  <div className=" required field ">
                    <label style={{ textAlign: "left" }}>Token</label>
                    <input
                      type="text"
                      placeholder="Enter Token From Email"
                      onChange={(event) =>
                        dispatch(setTokken(event.target.value))
                      }
                    />
                    <span style={{ opacity: "0.5" }}>
                      <i>
                        The code that was emailed to you. This is
                        case-sensitive.
                      </i>
                    </span>
                  </div>
                  <div className=" required field ">
                    <label style={{ textAlign: "left" }}>Email</label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      onChange={(event) =>
                        dispatch(emailChanger(event.target.value))
                      }
                    />
                  </div>
                  <div className=" required field ">
                    <label style={{ textAlign: "left" }}>New Password</label>
                    <input
                      type="password"
                      placeholder="Enter New Password"
                      onChange={(event) =>
                        dispatch(passwordChanger(event.target.value))
                      }
                    />
                  </div>
                  <div className=" required field ">
                    <label style={{ textAlign: "left" }}>
                      Password Confirmation
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password Again"
                      onChange={(event) =>
                        dispatch(
                          passwordConfirmationChanger(event.target.value)
                        )
                      }
                    />
                  </div>
                  <button className="ui green  button" type="submit">
                    Reset Password
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
}

export default ResetStorePasswordForm;
