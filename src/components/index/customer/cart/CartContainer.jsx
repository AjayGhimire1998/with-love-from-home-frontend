import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CartItem from "./CartItem";
import "../home/product.scss";
import { useEffect } from "react";
import {
  calculateTotal,
  closeCheckOutForm,
  openCheckOutForm,
  openClearCartModal,
} from "../../../../features/home/homeproductSlice";
import ClearCartModal from "./ClearCartModal";
import CheckOutForm from "./CheckOutForm";
import Footer from "../../../static_pages/Footer";
import axios from "axios";
import { authHeader } from "../../../../app/services/auth-services/auth-header";
import { getCurrentUser } from "../../../../app/services/auth-services/auth-service";

function CartContainer({ checkLoader }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const { cartItems, total, amount } = useSelector((store) => store.homeproduct);
  const {
    cartAmount,
    cartItems,
    total,
    isClearCartOpen,
    isCheckOutFormOpen,
    isFinalCheckOutButtonOpen,
    createdCarts,
  } = useSelector((store) => store.homeproduct);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  const headers = authHeader(getCurrentUser());
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    cartItems?.forEach((item) => {
      axios
        .post(
          "http://localhost:3001/api/v1/cart_items",
          {
            cart_item: {
              product_id: item.product.id,
              amount: item.amount,
              total: item.totalPrice,
              status: "pending",
              cart_id: createdCarts?.find(
                (cart) => cart.store_id === item.product.store_id
              ).id,
            },
          },
          { headers }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            navigate("/thank-you");
            window.location.reload();
          }
        })
        .catch((error) => console.log(error));
    });
    checkLoader(2000);
  };

  if (cartAmount < 1) {
    return (
      <>
        <br />
        <div className="ui container">
          <button
            className="ui labeled primary icon button"
            onClick={() => navigate(-1)}
          >
            <i className="left arrow icon"></i>
            Go Back
          </button>
          <br />
          <br />
          <section className="cart">
            <header>
              <h2>Your Cart</h2>
              <h4 className="empty-cart">is currently empty</h4>
            </header>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <br />
      <div className="ui container">
        <button
          className="ui labeled primary icon button"
          onClick={() => {
            navigate(-1);
            dispatch(closeCheckOutForm());
          }}
        >
          <i className="left arrow icon"></i>
          Go Back
        </button>
        <br />
        <br />
        <section className="cart">
          <header>
            <h2>Your Cart</h2>
          </header>
          <div>
            {isClearCartOpen && <ClearCartModal />}
            {cartItems.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </div>
          <footer>
            <hr />
            <div className="cart-total">
              <h4>
                total:{" "}
                <span style={{ fontSize: "22px" }}>AU$ {total.toFixed(2)}</span>
              </h4>
            </div>
            <br />
            <br />
            <button
              className="ui red button"
              disabled={isCheckOutFormOpen || isFinalCheckOutButtonOpen}
              onClick={() => dispatch(openClearCartModal())}
            >
              Clear Cart
            </button>
            <button
              className="ui green button"
              disabled={isCheckOutFormOpen || isFinalCheckOutButtonOpen}
              onClick={() => dispatch(openCheckOutForm())}
            >
              Check Out
            </button>
          </footer>
          <br />
          <br />
          <br />
          <br />
          {isCheckOutFormOpen && <CheckOutForm />}
          {isFinalCheckOutButtonOpen && (
            <button
              className="ui huge green button"
              style={{ width: "100%" }}
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </button>
          )}
        </section>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default CartContainer;
