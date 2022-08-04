import React from "react";
import image from "./hehe.jpeg";
import {useNavigate} from "react-router"


function StaticHomePage() {
  const navigate = useNavigate()
  return (  
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
          }}
        >
          Find nostalgia{" "}
        </h3>
        <br />
        <br />
        <button className="ui huge yellow button " onClick={() => navigate('/login')}>
          <span style={{ color: "black" }}>Get Started</span>{" "}
          <i className="right arrow icon black"></i>
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default StaticHomePage;
