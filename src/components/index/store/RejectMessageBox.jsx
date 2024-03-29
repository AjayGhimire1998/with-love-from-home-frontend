import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRejectMessage } from "../../../features/dashboard/dashboardSlice";
import axios from "axios";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import {
  replaceRecentlyUpdatedOrder,
  setRecentlyUpdatedOrder,
} from "../../../features/dashboard/dashboardSlice";
import { closeRejectMessageBox } from "../../../features/dashboard/modalSlice";

function RejectMessageBox() {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { orderId, rejectMessage } = useSelector((store) => store.dashboard);

  const headers = authHeader(getCurrentStore());
  const handleReject = async () => {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${API_URL}/cart_item/cart_items/${orderId}`,
          {
            cart_item: {
              status: "rejected",
              reject_message: rejectMessage,
            },
          },
          { headers }
        )
        .then((response) => {
          resolve(response.data);
          dispatch(setRecentlyUpdatedOrder(response.data));
          dispatch(replaceRecentlyUpdatedOrder());
        });
    })
      .catch((error) => console.log(error))
      .finally(() => {
        dispatch(replaceRecentlyUpdatedOrder());
        sendEmail();
        dispatch(closeRejectMessageBox());
      });
  };

  const sendEmail = async () => {
    axios
      .post(`${API_URL}order/${orderId}/mail_to_user`)
      .then((response) => {
        // console.log(response);
        console.log("Email Sent!");
      });
  };

  return (
    <div style={{ textAlign: "center", justifyContent: "center" }}>
      <label>Reason for rejecting: </label>
      <textarea
        onChange={(e) => dispatch(setRejectMessage(e.target.value))}
        rows={5}
        cols={30}
      ></textarea>
      <br />
      <button className="ui small green button" onClick={handleReject}>
        Confirm
      </button>
    </div>
  );
}

export default RejectMessageBox;
