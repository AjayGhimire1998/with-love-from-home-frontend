import React from "react";
import { closeConfirmDeleteModal } from "../../../features/dashboard/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import "./modal.css";
import axios from "axios";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import { eraseDeletedProduct } from "../../../features/dashboard/productSlice";

export const ConfirmDeleteModal = ({ checkLoader }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { name, id } = useSelector((store) => store.product);

  const headers = authHeader(getCurrentStore());

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    axios.delete(`${API_URL}products/${id}`, { headers });
    checkLoader(1000);
    dispatch(eraseDeletedProduct());
    dispatch(closeConfirmDeleteModal());
  };
  return (
    <aside className="modal-container">
      <div className="modal">
        <div style={{ display: "table", height: "100%", margin: "0 auto" }}>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "center",
              padding: "50px",
            }}
          >
            <h4>Delete&nbsp;{name}&nbsp; ?</h4>
            <br />
            <br />
            <div className="btn-container">
              <button
                type="button"
                className="ui button tiny red"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
              <button
                type="button"
                className="ui button tiny green"
                onClick={() => {
                  dispatch(closeConfirmDeleteModal());
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
