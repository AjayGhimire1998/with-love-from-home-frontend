import React from "react";

function Footer() {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui container">
        <div className="ui stackable inverted divided equal height stackable grid">
          <div className="three wide column">
            <h4 className="ui inverted header">About</h4>
            <div className="ui inverted link list">
              <a href="/" className="item">
                Our App
              </a>
              <a href="/" className="item">
                Contact Us
              </a>
              <a href="/" className="item">
                Collab
              </a>
              <a href="/" className="item">
                Agreements and Policies
              </a>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui inverted header">Services</h4>
            <div className="ui inverted link list">
              <a href="/" className="item">
                Store Registrations
              </a>

              <a href="/" className="item">
                International Supplies
              </a>
              <a href="/" className="item">
                Delivery Partner
              </a>
            </div>
          </div>
          <div className="seven wide column">
            <br />
            <p style={{ textAlign: "center" }}>
              &copy; 2022 WithLoveFromHome.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
