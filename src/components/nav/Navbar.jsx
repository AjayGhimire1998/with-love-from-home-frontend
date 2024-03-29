import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../app/services/auth-services/auth-service";
import { useDispatch, useSelector } from "react-redux";
// import { openViewOrder } from "../../features/dashboard/modalSlice";
import "./nav.css";
import { isStoreLoggedInChangerToFalse } from "../../features/auth/storeSlice";
import { isCustomerLoggedInChangerToFalse } from "../../features/auth/customerSlice";

function Navbar({checkLoader}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isStoreLoggedIn, storeId } = useSelector((store) => store.store);
  const { isCustomerLoggedIn, customerId } = useSelector((store) => store.customer);
  const { cartAmount } = useSelector((store) => store.homeproduct);
  const { userOrders } = useSelector(
    (store) => store.home
  );
  const { storeOrders } = useSelector(
    (store) => store.dashboard
  );

  return (
    <>
      <div className="pusher">
        <div className="ui inverted vertical masthead center aligned segment ">
          <div className="ui sticky container">
            {isStoreLoggedIn || isCustomerLoggedIn ? (
              <div className="ui large secondary inverted pointing menu  media">
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
                    <>
                      <div
                        className="nav-container"
                        onClick={() => navigate("/cart")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <div className="amount-container">
                          <p className="total-amount">{cartAmount}</p>
                        </div>
                      </div>
                      <button
                        className="ui inverted button"
                        onClick={() => navigate(`users/${customerId}/orders`)}
                      >
                        {`Track Orders [${userOrders?.cart_items ? userOrders.cart_items.length : '0'}]`}
                      </button>
                    </>
                  ) : null}
                  {isStoreLoggedIn ? (
                    <button
                      className="ui inverted button"
                      onClick={() => navigate(`stores/${storeId}/orders`)}
                    >
                       {`Your Orders [${storeOrders?.cart_items ? storeOrders.cart_items.length : '0'}]`}
                    </button>
                  ) : null}
                  <button
                    className="ui inverted button"
                    onClick={() => {
                      checkLoader(1000); 
                      navigate("/");
                      logOut();
                      dispatch(isStoreLoggedInChangerToFalse());
                      dispatch(isCustomerLoggedInChangerToFalse());
                     
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="ui large secondary inverted pointing menu media">
                <NavLink
                  className=" item ui label massive"
                  to="/"
                >
                  WITH LOVE FROM HOME
                </NavLink>

                <div className="right item menu">
                  <NavLink className="ui inverted button " to="/login">
                    Login
                  </NavLink>
                  <NavLink className="ui inverted button" to="signup">
                    Sign Up
                  </NavLink>
                  <NavLink className="ui inverted button" to="store/signup">
                    Register Store
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
