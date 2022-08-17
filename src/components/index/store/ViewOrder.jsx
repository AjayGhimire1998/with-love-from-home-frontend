import React from "react";
import { useSelector } from "react-redux";

function ViewOrder({ item }) {
  const { allStoreProducts } = useSelector((store) => store.product);
  // const { allCustomers } = useSelector((store) => store.customer);
  const { storeOrders } = useSelector((store) => store.dashboard);

  const product = allStoreProducts?.find(
    (product) => product.id === item.product_id
  );

  const customer = storeOrders?.carts.find(
    (order) => order.id === item.cart_id
  );

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
            Order Id:{" "}
            <span style={{ fontWeight: "bolder" }}>{customer.id}</span>
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
            <span style={{ fontWeight: "bolder", color: "red" }}>
              {item.status}
            </span>
          </p>
          <br/>
          <h4 style={{ fontSize: "20px" }}>Deliver To:</h4>
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
              {customer.delivery_address}
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
            <span style={{ fontWeight: "bolder" }}>{customer.created_at}</span>
          </p>
        
        </div>
      </div>
      <br />
      <br />
      <div className="inline">
        <div className="ui tiny green button">Approve</div>
        <div className="ui tiny red button">Reject</div>
      </div>
    </div>
  );
}

export default ViewOrder;
