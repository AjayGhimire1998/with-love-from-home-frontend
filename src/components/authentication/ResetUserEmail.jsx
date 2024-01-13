import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { emailChange, setError } from "../../features/auth/customerSlice";
import ErrorMessage from "../errors/ErrorMessage";

function ResetUserEmail({ checkLoader }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, error } = useSelector((store) => store.customer);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/passwords/forgot_user_password", {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setError(data.alert));
      })
      .catch((error) => console.log(error));
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
            <h3>Request user password reset:</h3>
            <br />
            <form
              className="ui form"
              onSubmit={(e) => {
                checkLoader(3000);
                handleSubmit(e);
              }}
            >
              <div className=" required field ">
                <label style={{ textAlign: "left" }}>Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(event) =>
                    dispatch(emailChange(event.target.value))
                  }
                />
              </div>
              <button className="ui green  button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    </>
  );
}

export default ResetUserEmail;
