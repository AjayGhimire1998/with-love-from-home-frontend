import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import "./payment.css";
import { useSelector } from "react-redux";

function PaymentForm() {
  const { total } = useSelector((store) => store.homeproduct);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const clientSecret = "sk_test_51Lc01gDqIGzAt87BdHML2dyVRE8IzLOkaNXeiAzhABPgDqnpq8xeuMpAyIFQDS7ORZmx9OLctNWlrlR9ZWULScaF00ceMjEKF8"

    // const { clientSecret } = await fetch("/create-payment-intent", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     paymentMethodType: "card",
    //     currency: "aud",
    //     amount: total,
    //   }),
    // }).then((response) => response.json());

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });

    await stripe.confirmCardPayment(
        clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }
    )
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="token" />
      <div className="group-card">
        <label>
          <div id="card-element" className="field-card">
            <CardElement />
          </div>
        </label>
      </div>
      <div className="group-card">
        <label>
          <span>Name on Card</span>
          <input
            id="first-name"
            name="first-name"
            className="field-card"
            placeholder=""
          />
        </label>
      </div>
      <button id="pay-card" type="submit" disabled={!stripe || !elements}>
        Pay AU${total}
      </button>
    </form>
  );
}

export default PaymentForm;
