import React from "react";
import { useNavigate } from "react-router";
import ViewOrder from "./ViewOrder";
import { useDispatch, useSelector } from "react-redux";

import {
  setViewOrderStatusToApproved,
  setViewOrderStatusToPending,
  setViewOrderStatusToRejected,
} from "../../../features/dashboard/dashboardSlice";

function ViewOrdersContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { storeOrders, viewOrderStatus } = useSelector(
    (store) => store.dashboard
  );

  return (
    <>
      <br />
      {storeOrders.length !== 0 ? (
        <div className="ui container">
          <button
            className="ui labeled primary icon button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="left arrow icon"></i>
            Go Back
          </button>
          <br />
          <br />
          <section className="cart">
            <header>
              <h2>Your Orders</h2>
            </header>
            <div className="ui fluid three item menu">
              <button
                className={
                  viewOrderStatus === "pending"
                    ? "ui gray button item active"
                    : "ui gray button item"
                }
                onClick={() => dispatch(setViewOrderStatusToPending())}
              >
                Pending
              </button>
              <button
                className={
                  viewOrderStatus === "approved"
                    ? "ui gray button item active"
                    : "ui gray button item"
                }
                onClick={() => dispatch(setViewOrderStatusToApproved())}
              >
                Approved
              </button>
              <button
                className={
                  viewOrderStatus === "rejected"
                    ? "ui gray button item active"
                    : "ui gray button item"
                }
                onClick={() => dispatch(setViewOrderStatusToRejected())}
              >
                Rejected
              </button>
            </div>
            <br />
            <br />
            <div style={{ textAlign: "center" }}>
              {storeOrders.cart_items ? (
                storeOrders.cart_items.flat(Infinity)?.map((item) => {
                  if (item.status === viewOrderStatus) {
                    return <ViewOrder key={item.id} item={item} />;
                  } else {
                    return null; // Return null if the condition is not met
                  }
                })
              ) : (
                <span style={{ textAlign: "center" }}>You have no orders</span>
              )}
            </div>

            <br />
            <br />
            <br />
            <br />
          </section>
          <br />
          <br />
        </div>
      ) : (
        <div className="ui container" style={{ textAlign: "center" }}>
          <br />
          <br />
          <h2> Something Went Wrong</h2>
          <br />
          <br />
          <button className="ui primary button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      )}
    </>
  );
}

export default ViewOrdersContainer;
