import React from "react";
import image from "./hehe.jpeg";
import { useNavigate } from "react-router";
// import Navbar from "../nav/Navbar";

function StaticHomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="ui inverted vertical masthead center aligned segment"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      >
        <div className="ui text container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1
            className="ui inverted center "
            style={{
              fontFamily: "monospace",
              fontSize: "50px",
              textShadow: "4px 6px black",
              WebkitTextStroke: "2px black",
            }}
          >
            With Love From Home
          </h1>
          <h3
            style={{
              fontFamily: "monospace",
              fontSize: "30px",
              textShadow: "2px 2px black",
              fontWeight: "bolder",
              WebkitTextStroke: "1px black",
              backgroundColor: "rgba(33, 31, 31, 0.6)", // Adjust the alpha (fourth value) for transparency
              padding: "15px",
          
            }}
          >
            Discover a piece of home, no matter where you are. We bring the essence of familiar products right to your doorstep.{" "}
          </h3>
          <br />
          <br />
          <button
            className="ui huge yellow button "
            onClick={() => navigate("/login")}
          >
            <span style={{ color: "black" }}>Get Started</span>{" "}
            <i className="right arrow icon black"></i>
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default StaticHomePage;
