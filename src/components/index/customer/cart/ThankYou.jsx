import React from "react";
import { useNavigate } from "react-router";

function ThankYou() {
  const navigate = useNavigate();
  return (
    <div className="ui container">
      <div style={{ display: "table", height: "100%", margin: "0 auto" }}>
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
            padding: "50px",
          }}
        >
          <h2>Order Successfully Placed</h2>
          <br />
          <br />
          <h3>Thank you!!</h3>
          <br />
          <button className="ui blue button" onClick={() => navigate("/")}>
            Shop Again
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
