import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../app/services/auth-services/auth-service";
import { useSelector } from "react-redux";
function Navbar() {
  const { isStoreLoggedIn } = useSelector((store) => store.store);
  const { isCustomerLoggedIn } = useSelector((store) => store.customer);
  // const navigate = useNavigate();
  return (
    <>
      <div className="pusher">
        <div className="ui inverted vertical masthead center aligned segment ">
          <div className="ui sticky container ">
            {isStoreLoggedIn || isCustomerLoggedIn ? (
              <div className="ui large secondary inverted pointing menu">
                {isStoreLoggedIn ? (
                  <NavLink className=" item ui label massive" to="/">
                    WITH LOVE FROM HOME
                  </NavLink>
                ) : null}
                {isCustomerLoggedIn ? (
                  <NavLink className=" item ui label massive" to="/">
                    WITH LOVE FROM HOME
                  </NavLink>
                ) : null}
                <div className="right item">
                  {isCustomerLoggedIn ? (
                    <button
                      className="ui inverted button"
                      // onClick={() => logOut()}
                    >
                      View Cart
                    </button>
                  ) : null}
                  {isStoreLoggedIn ? (
                    <button
                      className="ui inverted button"
                      // onClick={() => logOut()}
                    >
                      View Orders
                    </button>
                  ) : null}
                  <button
                    className="ui inverted button"
                    onClick={() => logOut()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="ui large secondary inverted pointing menu">
                <NavLink className=" item ui label massive" to="/with-love-from-home">
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
