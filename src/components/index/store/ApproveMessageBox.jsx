import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateTime,
  setApproveMessage,
} from "../../../features/dashboard/dashboardSlice";
import DateTimePicker from "react-datetime-picker";
import { useEffect } from "react";
import { readableDate } from "../../../app/services/other-services/service";
import axios from "axios";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import {
  replaceRecentlyUpdatedOrder,
  setRecentlyUpdatedOrder,
} from "../../../features/dashboard/dashboardSlice";
import { closeApproveMessageBox } from "../../../features/dashboard/modalSlice";
import { fixTimezoneOffset } from "../../../app/services/other-services/service";

function ApproveMesssageBox() {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { dateTime, orderId, approveMessage } = useSelector(
    (store) => store.dashboard
  );
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    dispatch(setDateTime(value));
  }, [value]);

  console.log(dateTime)

  const headers = authHeader(getCurrentStore());
  const handleApprove = async () => {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${API_URL}/cart_item/cart_items/${orderId}`,
          {
            cart_item: {
              status: "approved",
              approve_message: {
                date: fixTimezoneOffset(dateTime),
                message: approveMessage,
              },
            },
          },
          { headers }
        )
        .then((response) => {
          resolve(response.data);
          dispatch(setRecentlyUpdatedOrder(response.data));
        });
    })
      .catch((error) => console.log(error))
      .finally(() => {
        dispatch(replaceRecentlyUpdatedOrder());
        sendEmail();
        dispatch(closeApproveMessageBox());
      });
  };

  const sendEmail = async () => {
    axios
      .post(`${API_URL}order/${orderId}/mail_to_user`)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div style={{ textAlign: "center", justifyContent: "center" }}>
      <label>Set Date and Time of Delivery:</label>
      <br />
      <DateTimePicker onChange={onChange} value={value} />
      <br />
      <br />
      {dateTime ? (
        <p>
          DateTime Selected:{" "}
          <span style={{ fontWeight: "900" }}>{dateTime.toLocaleString()}</span>
        </p>
      ) : null}
      <br />
      <label>Any Message To Customer ?</label>
      <textarea
        rows={5}
        cols={30}
        onChange={(e) => dispatch(setApproveMessage(e.target.value))}
      ></textarea>
      <br />
      <button className="ui small green button" onClick={handleApprove}>
        Confirm
      </button>
    </div>
  );
}

export default ApproveMesssageBox;
