import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CartItem from "./CartItem";
import "../home/product.scss";
import { useEffect } from "react";
import {
  calculateTotal,
  clearCart,
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
import ErrorMessage from "../../../errors/ErrorMessage";
// import PaymentForm from "./PaymentForm";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

function CartContainer({ checkLoader }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const stripePromise = loadStripe("pk_test_51Lc01gDqIGzAt87BxaT4T9WGHwQ4PDIluMgOxV1GKdiaw86RnvvTKbjxhrehioTZ3tboQoLGa8aHIEHHOQS4MnLH00gcutMqFN");

  const { isErrorMessage } = useSelector((store) => store.rating);
  const {
    cartAmount,
    cartItems,
    total,
    isClearCartOpen,
    isCheckOutFormOpen,
    isFinalCheckOutButtonOpen,
    createdCarts,
    isStartPaymentFormOpen,
  } = useSelector((store) => store.homeproduct);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  const headers = authHeader(getCurrentUser());

  const handlePlaceOrder = () => {
    return new Promise((resolve, reject) => {
      cartItems?.forEach((item) => {
        axios
          .post(
            `${API_URL}cart_item/cart_items`,
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
          .then((response) => resolve(response.data));
      });
    })
      .catch((error) => console.log(error))
      .finally(() => {
        checkLoader(3000);
        sendEmails();
        navigate("/thank-you");
      });
  };

  const sendEmails = async () => {
    createdCarts?.forEach((cart) => {
      axios
        .post(
          `${API_URL}orders/${cart.id}/mail_to_user_and_store`,
        )
        .then((response) => {
          console.log(response);
        });
    });
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
            <br />
            <br />
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <br />
      {isErrorMessage && <ErrorMessage />}
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
              disabled={isCheckOutFormOpen || isFinalCheckOutButtonOpen || isStartPaymentFormOpen}
              onClick={() => dispatch(openClearCartModal())}
            >
              Clear Cart
            </button>
            <button
              className="ui green button"
              disabled={isCheckOutFormOpen || isFinalCheckOutButtonOpen || isStartPaymentFormOpen}
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
          {/* {isStartPaymentFormOpen && (
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          )} */}
          {isFinalCheckOutButtonOpen && (
            <button
              className="ui huge green button"
              style={{ width: "100%" }}
              onClick={() => {
                handlePlaceOrder();
                dispatch(clearCart());
              }}
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
