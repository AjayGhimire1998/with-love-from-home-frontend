import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp } from "../../../../app/services/icons";
import {
  removeItem,
  increaseInCart,
  decreaseInCart,
} from "../../../../features/home/homeproductSlice";
import "../home/product.scss";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isCheckOutFormOpen } = useSelector((store) => store.homeproduct);

  return (
    <section className="cart-item">
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        onClick={() => navigate(`/products/${item.id}`)}
        style={{ cursor: "pointer" }}
      />
      <div>
        <h4 style={{ fontWeight: "bolder", fontSize: "18px" }}>
          {item.product.name}
        </h4>
        <h4>
          AU${" "}
          <span className="item-price">{item.product.price.toFixed(2)}</span>
        </h4>
        <button
          className="remove-btn"
          disabled={isCheckOutFormOpen}
          onClick={() => {
            dispatch(removeItem(item.id));
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          disabled={isCheckOutFormOpen}
          onClick={() => dispatch(increaseInCart(item.id))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{item.amount}</p>
        <button
          className="amount-btn"
          disabled={isCheckOutFormOpen}
          onClick={() => {
            if (item.amount === 1) {
              dispatch(removeItem(item.id));
              return;
            }
            dispatch(decreaseInCart(item.id));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </section>
  );
}

export default CartItem;
