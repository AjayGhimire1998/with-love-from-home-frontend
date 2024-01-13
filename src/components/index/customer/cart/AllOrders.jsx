import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  setViewOrderStatusToPending,
  setViewOrderStatusToApproved,
  setViewOrderStatusToRejected,
} from "../../../../features/dashboard/dashboardSlice";
import EachOrder from "./EachOrder";

function AllOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userOrders } = useSelector((store) => store.home);
  const { viewOrderStatus } = useSelector((store) => store.dashboard);

  return (
    <>
      <br />
      {userOrders.length !== 0 ? (
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
              {userOrders.cart_items ? (
                userOrders.cart_items.flat(Infinity)?.map((item) => {
                  if (item.status === viewOrderStatus) {
                    return <EachOrder key={item.id} item={item} />;
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

export default AllOrders;
