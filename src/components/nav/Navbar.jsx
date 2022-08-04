import React from "react";
import { NavLink } from "react-router-dom";
import { storeLogOut } from "../../app/services/auth-services/auth-service";
import { useSelector } from "react-redux";
function Navbar() {
  const { isStoreLoggedIn } = useSelector((store) => store.store);
  return (
    <>
      <div className="pusher">
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui container">
            {isStoreLoggedIn ? (
              <div className="ui large secondary inverted pointing menu">
                <NavLink className=" item ui label massive" to="/dashboard">
                  WITH LOVE FROM HOME
                </NavLink>
                <div className="right item">
                  <button
                    className="ui inverted button"
                    onClick={() => storeLogOut()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="ui large secondary inverted pointing menu">
                <NavLink className=" item ui label massive" to="/">
                  WITH LOVE FROM HOME
                </NavLink>

                <div className="right item">
                  <NavLink className="ui inverted button" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="ui inverted button" to="signup">
                    Signup
                  </NavLink>
                  <NavLink className="ui inverted button" to="store/signup">
                    Register Your Store
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
