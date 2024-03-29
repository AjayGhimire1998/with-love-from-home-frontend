import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCheckOutForm,
  setEmail,
  setPhone,
  setFullName,
  openFinalCheckOutButton,
  setCreatedCarts,
} from "../../../../features/home/homeproductSlice";
import {
  setStreetAddress,
  setApt,
  setSuburb,
  setState,
  setZip,
  setError,
} from "../../../../features/cart/cartFormSlice";
import { authHeader } from "../../../../app/services/auth-services/auth-header";
import { getCurrentUser } from "../../../../app/services/auth-services/auth-service";
import PlacesAutoComplete from "./PlacesAutoComplete";
import ErrorMessage from "../../../errors/ErrorMessage";

function CheckOutForm() {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { customerId } = useSelector((store) => store.customer);
  const { cartItems, fullName, phone, email } = useSelector(
    (store) => store.homeproduct
  );

  const { fullAddress, streetAddress, apt, suburb, state, zip, error } =
    useSelector((store) => store.cartForm);

  const uniqueStoresForCartCreation = cartItems.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.product.store_id === value.product.store_id)
  );

  const headers = authHeader(getCurrentUser());

  const handleSave = (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !phone ||
      !email ||
      !streetAddress ||
      !apt ||
      !suburb ||
      !state ||
      !zip
    ) {
      dispatch(setError("All fields are required."));
      return; // Prevent form submission
    }

    uniqueStoresForCartCreation.forEach((item) => {
      // console.log(item.product.store_id);
      axios
        .post(
          `${API_URL}cart/carts`,
          {
            cart: {
              store_id: item.product.store_id,
              customer_id: customerId,
              customer_name: fullName,
              phone_number: phone,
              delivery_address: {
                full_address: fullAddress,
                street_address: streetAddress,
                apt: `${apt}/`,
                suburb: suburb,
                state: state,
                zip: zip,
              },
              recipient_email: email,
            },
          },
          { headers }
        )
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            dispatch(setCreatedCarts(response.data));
            // dispatch(openStartPaymentForm())
            dispatch(openFinalCheckOutButton());
          } else if (response.status === 422) {
            dispatch(setError("All fields must have valid entries."));
          }
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      {error && <ErrorMessage error={error} />}
      <br/>
      <form className="ui form">
        <h2 style={{ textAlign: "center" }}>Check Out</h2>
        <hr />
        <br />
        <br />
        <h4 className="ui dividing header">Shipping Information</h4>
        <div className="required field">
          <label>Full Name</label>
          <div className="two fields">
            <div className="required field">
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
          <PlacesAutoComplete />
        </div>

        <div className=" required field">
          <div className=" required fields">
            <div className="twelve wide field">
              <label>Street Address</label>
              <input
                type="text"
                name="shipping[street-address]"
                placeholder="Street Address"
                value={streetAddress}
                onChange={(e) => dispatch(setStreetAddress(e.target.value))}
              />
            </div>
            <div className="four wide field">
              <label>Unit/APT Number</label>
              <input
                type="number"
                name="shipping[apartment-number]"
                placeholder="Apt/Unit"
                onChange={(e) => dispatch(setApt(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className=" required field">
          <label>Suburb</label>
          <div className="two fields">
            <div className="field">
              <input
                type="text"
                name="shipping[suburb]"
                value={suburb}
                onChange={(e) => dispatch(setSuburb(e.target.value))}
                placeholder="Suburb"
              />
            </div>
          </div>
        </div>
        <div className="two fields">
          <div className=" required field">
            <label>Select State</label>
            <select
              className="ui fluid dropdown"
              value={state}
              onChange={(e) => dispatch(setState(e.target.value))}
            >
              <option key={1} value="">
                State
              </option>
              <option key={2} value="ACT">
                Australian Capital Territory
              </option>
              <option key={3} value="NSW">
                New South Wales
              </option>
              <option key={4} value="NT">
                Northern Territory
              </option>
              <option key={5} value="QLD">
                Queensland
              </option>
              <option key={6} value="SA">
                South Australia
              </option>
              <option key={7} value="TAS">
                Tasmania
              </option>
              <option key={8} value="VIC">
                Victoria
              </option>
              <option key={9} value="WA">
                Western Australia
              </option>
            </select>
          </div>
          <div className="required field">
            <label>Zip Code</label>
            <input
              type="number"
              name="shipping[zip-code]"
              placeholder="Zip Code"
              value={parseInt(zip)}
              onChange={(e) => {
                const inputText = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                const formattedZip = inputText.slice(0, 4); // Take only the first 4 digits
                dispatch(setZip(formattedZip));
              }}
              maxLength="4"
            />
          </div>
        </div>

        <div className="required field">
          <label>Phone Number</label>
          <div className="two fields">
            <div className="field">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/800px-Flag_of_Australia_%28converted%29.svg.png"
                alt="aus"
                style={{ height: "15px", width: "15px" }}
              />
              <input
                type="number"
                name="shipping[phone-number]"
                onChange={(e) => {
                  const inputText = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  const formattedPhoneNumber = inputText.slice(0, 10); // Take only the first 10 digits
                  dispatch(setPhone(formattedPhoneNumber));
                }}
                placeholder="Phone Number"
                maxLength="10"
                pattern="[0-9]*" // Only allow numeric input
                // maxLength="10" // Maximum length for Australian phone numbers
                title="Please enter a valid Australian phone number"
                // required
              />
            </div>
          </div>
        </div>

        <h4 className="ui dividing header">Notify:</h4>
        <div className=" required field">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </div>
        {error && <small style={{color: "red"}}>All fields must be filled.</small>}
        <br/>
        <br/>
        <div className="ui green button" tabIndex="0" onClick={handleSave}>
          Save and Proceed To Payment
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
