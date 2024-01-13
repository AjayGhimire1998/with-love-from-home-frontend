import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  readableDate,
  setProperAddress,
} from "../../../../app/services/other-services/service";

function EachOrder({ item }) {
  const navigate = useNavigate();

  const { allProducts, userOrders } = useSelector((store) => store.home);

  const product = allProducts?.products.find(
    (product) => product.id === item.product_id
  );

  const customer = userOrders?.carts.find((order) => order.id === item.cart_id);

  return (
    <>
      {product ? (
        <div className="ui placeholder segment">
          <div
            className="ui icon header"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/products/${item.product_id}`)}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ height: "140px", width: "180px" }}
            />
            <br />
            <br />
            <span>{product.name} </span>
            <span style={{ color: "red" }}>(AU$ {product.price})</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <br />
            <div>
              <h3>Order Summary</h3>
              <br />

              <p>
                Order Id:{" "}
                <span style={{ fontWeight: "bolder" }}>{item.id}</span>
              </p>
              <p>
                Quantity:{" "}
                <span style={{ fontWeight: "bolder" }}>{item.amount}</span>
              </p>
              <p>
                Total: AU${" "}
                <span
                  style={{
                    color: "red",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
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
                    Expected Delivery:{" "}
                    <span
                      style={{
                        fontWeight: "bolder",
                        fontSize: "20px",
                        color: "royalblue",
                      }}
                    >
                      {readableDate(item.approve_message.date)}
                    </span>
                  </p>
                  <p>
                    Message From Store:{" "}
                    <span
                      style={{
                        fontWeight: "bolder",
                      }}
                    >
                      ``{item.approve_message.message}``
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
              <h4 style={{ fontSize: "20px" }}>Your Details:</h4>
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
                  {/* {customer.delivery_address.full_address} */}
                  {setProperAddress(customer.delivery_address)}
                </span>
              </p>
              <p>
                Phone:{" "}
                <span style={{ fontWeight: "bolder" }}>
                  {customer.phone_number}
                </span>
              </p>
              <p>
                Email:{" "}
                <span style={{ fontWeight: "bolder" }}>
                  {customer.recipient_email}
                </span>
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
        </div>
      ) : null}
    </>
  );
}

export default EachOrder;
