import React from "react";
import { useNavigate } from "react-router";
import ViewOrder from "./ViewOrder";
import Footer from "../../static_pages/Footer";
import { useSelector } from "react-redux";
import Loader from "../../static_pages/Loader";

function ViewOrdersContainer() {
  const navigate = useNavigate();

  const { allStoreProducts } = useSelector((store) => store.product);
  const { storeOrders } = useSelector((store) => store.dashboard);

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
            <div style={{ textAlign: "center" }}>
              {storeOrders.cart_items[0] ? (
                storeOrders.cart_items[0]?.map((item) => {
                  return <ViewOrder key={item.id} item={item} />;
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
