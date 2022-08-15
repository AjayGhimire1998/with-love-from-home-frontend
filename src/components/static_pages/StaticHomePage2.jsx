import React from "react";
// import Carousel from 'react-responsive-carousel'
import StaticCarouselSlide from "./StaticCarouselSlide";
import { useNavigate } from "react-router";


function StaticHomePage2() {
  const navigate = useNavigate();

  return (
    <div className="ui vertical stripe segment">
      <br />
      <br />
      <div className="ui middle aligned stackable grid container">
        <div className="row">
          <div className="eight wide column">
            <br />
            <h1
              className="ui header"
              style={{
                color: "whitesmoke",
                fontFamily: "monospace",
                fontSize: "30px",
                textShadow: "2px 2px black",
                fontWeight: "bolder",
                WebkitTextStroke: "1px black",
              }}
            >
              Shop till you drop
            </h1>
            <p>
              Someone knows what you miss, what makes you nostalgic about home.
              Find your favourites by your <strong>GOD-MOMS</strong>,{" "}
              <span
                style={{
                  color: "purple",
                  fontFamily: "cursive",
                  fontSize: "20px",
                  fontWeight: "bolder",
                }}
              >
                home-made, hand-made and love-made.
              </span>
            </p>
            <br />
            <br />
            <h1
              className="ui header"
              style={{
                color: "whitesmoke",
                fontFamily: "monospace",
                fontSize: "30px",
                textShadow: "2px 2px black",
                fontWeight: "bolder",
                WebkitTextStroke: "1px black",
              }}
            >
              Give nostalgia, Earn happiness.
            </h1>
            <p>
              Yes that's right, earn money selling what you can sell. Register
              your store
              <strong>
                <a href="/store/signup"> here</a>
              </strong>
            </p>
          </div>
          <div className="six wide right floated column">
            <StaticCarouselSlide />
          </div>
        </div>
        <div className="row">
          <div className="center aligned column">
            <button
              className="ui red huge button"
              onClick={() => navigate("/login")}
            >
              Check it Out
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default StaticHomePage2;
