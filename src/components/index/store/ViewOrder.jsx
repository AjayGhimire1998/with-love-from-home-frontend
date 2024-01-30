import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import { readableDate, setProperAddress } from "../../../app/services/other-services/service";
import {
  eraseDeletedOrder,
  setOrderId,
} from "../../../features/dashboard/dashboardSlice";
import {
  openApproveMesssageBox,
  openRejectMessageBox,
} from "../../../features/dashboard/modalSlice";
import ApproveMesssageBox from "./ApproveMessageBox";
import RejectMessageBox from "./RejectMessageBox";

function ViewOrder({ item }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { allStoreProducts } = useSelector((store) => store.product);
  const { isApproveMessageBoxOpen, isRejectMessageBoxOpen } = useSelector(
    (store) => store.modal
  );
  const { storeOrders, orderId } = useSelector((store) => store.dashboard);

  const product = allStoreProducts?.find(
    (product) => product.id === item.product_id
  );

  const customer = storeOrders?.carts.find(
    (order) => order.id === item.cart_id
  );

  const headers = authHeader(getCurrentStore());

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_URL}/cart_item/cart_items/${item.id}`, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(eraseDeletedOrder(item.id));
      });
  };

  return (
    <div className="ui placeholder segment">
      <div className="ui icon header">
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ height: "140px", width: "180px" }}
        />
        <br />
        <br />
        {product.name}{" "}
        <span style={{ color: "red" }}>(AU$ {product.price})</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <br />
        <div>
          <h3>Order Summary</h3>
          <br />

          <p>
            Order Id: <span style={{ fontWeight: "bolder" }}>{item.id}</span>
          </p>
          <p>
            Quantity:{" "}
            <span style={{ fontWeight: "bolder" }}>{item.amount}</span>
          </p>
          <p>
            Total: AU${" "}
            <span
              style={{ color: "red", fontSize: "20px", fontWeight: "bolder" }}
            >
              {item.total}
            </span>
          </p>

          <p>
            Status:{" "}
            <span
              style={
                item.status === "pending"
                  ? { fontWeight: "bolder", color: "blue" }
                  : item.status === "approved"
                  ? { fontWeight: "bolder", color: "green" }
                  : { fontWeight: "bolder", color: "red" }
              }
            >
              {item.status.toUpperCase()}
            </span>
          </p>
          {item.approve_message ? (
            <>
            <p>
              Delivering on:{" "}
              <span style={{ fontWeight: "bolder" }}>
                {readableDate(item.approve_message.date)}
              </span>
            </p>
            <p>
              Message:{" "}
              <span style={{ fontWeight: "bolder" }}>
                {item.approve_message.message}
              </span>
            </p>
            </>
          ) : null}
          {item.reject_message ? (
            <p>
              Reason:{" "}
              <span style={{ fontWeight: "bolder", color: "red" }}>
                {item.reject_message}
              </span>
            </p>
          ) : null}

          <br />
          <h4 style={{ fontSize: "20px" }}>Delivery Details:</h4>
          <hr />
          <br />
          <p>
            Name:{" "}
            <span style={{ fontWeight: "bolder" }}>
              {customer.customer_name}
            </span>
          </p>
          <p>
            Address:{" "}
            <span style={{ fontWeight: "bolder" }}>
              {setProperAddress(customer.delivery_address)}
              {/* {customer.delivery_address.full_address} */}
            </span>
          </p>
          <p>
            Phone:{" "}
            <a
              href={"tel:" + customer.phone_number}
              style={{ fontWeight: "bolder" }}
            >
              {customer.phone_number}
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href={"mailto:" + customer.recipient_email}
              style={{ fontWeight: "bolder" }}
            >
              {customer.recipient_email}
            </a>
          </p>
          <p>
            Order Made On:{" "}
            <span style={{ fontWeight: "bolder" }}>
              {readableDate(customer.created_at)}
            </span>
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="inline">
        {item.status === "approved" || item.status === "rejected" ? (
          <div className="ui tiny red button" onClick={handleDelete}>
            Delete
          </div>
        ) : (
          <>
            <button
              className="ui tiny green button"
              onClick={() => {
                dispatch(setOrderId(item.id));
                dispatch(openApproveMesssageBox());
              }}
              disabled={isApproveMessageBoxOpen && item.id === orderId}
            >
              Approve
            </button>
            <button
              className="ui tiny red button"
              onClick={() => {
                dispatch(setOrderId(item.id));
                dispatch(openRejectMessageBox());
              }}
              disabled={isRejectMessageBoxOpen && item.id === orderId}
            >
              Reject
            </button>
          </>
        )}
      </div>
      <br />
      {isApproveMessageBoxOpen && item.id === orderId ? (
        <ApproveMesssageBox />
      ) : null}
      {isRejectMessageBoxOpen && item.id === orderId ? (
        <RejectMessageBox />
      ) : null}
    </div>
  );
}

export default ViewOrder;
