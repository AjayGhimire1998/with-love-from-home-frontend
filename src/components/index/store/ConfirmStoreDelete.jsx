import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import { closeConfirmDeleteStore } from "../../../features/dashboard/modalSlice";

function ConfirmStoreDelete({ checkLoader }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { storeId } = useSelector((store) => store.store);

  const headers = authHeader(getCurrentStore());

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:3001/api/v1/stores/${storeId}`, { headers });
    checkLoader(2000);
    window.localStorage.clear();
    window.location.reload();
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
            <h4>Are you sure you want to leave ?</h4>
            <br />
            <br />
            <div className="btn-container">
              <button
                type="button"
                className="ui button tiny red"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                type="button"
                className="ui button tiny green"
                onClick={() => {
                  dispatch(closeConfirmDeleteStore());
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
}

export default ConfirmStoreDelete;
