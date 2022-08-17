import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCheckOutForm,
  setEmail,
  setPhone,
  setFullName,
  setAddress,
  openFinalCheckOutButton,
  setCreatedCarts,
} from "../../../../features/home/homeproductSlice";
import { authHeader } from "../../../../app/services/auth-services/auth-header";
import { getCurrentUser } from "../../../../app/services/auth-services/auth-service";

function CheckOutForm() {
  const dispatch = useDispatch();
  const { allCustomers, customerId } = useSelector((store) => store.customer);
  const { cartItems, fullName, address, phone, email } = useSelector(
    (store) => store.homeproduct
  );

  const uniqueStoresForCartCreation = cartItems.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.product.store_id === value.product.store_id)
  );



  const headers = authHeader(getCurrentUser());

  const handleSave = (e) => {
    e.preventDefault();
    uniqueStoresForCartCreation.forEach((item) => {
      axios
        .post(
          `http://localhost:3001/api/v1/carts`,
          {
            cart: {
              store_id: item.product.store_id,
              user_id: customerId,
              customer_name: fullName,
              phone_number: phone,
              delivery_address: address,
              recipient_email: email,
            },
          },
          { headers }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            dispatch(setCreatedCarts(response.data));
            dispatch(openFinalCheckOutButton());
          }
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <form className="ui form">
        <h2 style={{ textAlign: "center" }}>Check Out</h2>
        <hr />
        <br />
        <br />
        <h4 className="ui dividing header">Shipping Information</h4>
        <div className="field">
          <label>Full Name</label>
          <div className="two fields">
            <div className="field">
              <input
                type="text"
                name="shipping[full-name]"
                placeholder="Full Name"
                onChange={(e) => dispatch(setFullName(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <label>Delivery Address</label>
          <div className="fields">
            <div className="twelve wide field">
              <input
                type="text"
                name="shipping[address]"
                placeholder="Street Address"
                onChange={(e) => dispatch(setAddress(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <label>Phone Number</label>
          <div className="two fields">
            <div className="field">
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/800px-Flag_of_Australia_%28converted%29.svg.png"
                }
                alt="aus"
                style={{ height: "15px", width: "15px" }}
              />
              <input
                type="number"
                name="shipping[phone-number]"
                onChange={(e) => dispatch(setPhone(e.target.value))}
                placeholder="Phone Number"
              />
            </div>
          </div>
        </div>

        <h4 className="ui dividing header">Receipt</h4>
        <div className="field">
          <label>Send Receipt To:</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </div>
        <div className="ui green button" tabIndex="0" onClick={handleSave}>
          Save
        </div>
        <div
          className="ui red button"
          tabIndex="0"
          onClick={() => dispatch(closeCheckOutForm())}
        >
          Cancel
        </div>
      </form>
    </>
  );
}

export default CheckOutForm;
