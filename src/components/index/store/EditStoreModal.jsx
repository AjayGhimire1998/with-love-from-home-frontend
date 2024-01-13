import React from "react";
import { useDispatch, useSelector } from "react-redux";

import StoreLogo from "../../authentication/form-helpers/StoreLogo";
import {
  closeEditStoreModal,
  openConfirmDeleteStore,
} from "../../../features/dashboard/modalSlice";
import { nameChanger } from "../../../features/auth/storeSlice";
import axios from "axios";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { setStore } from "../../../features/dashboard/dashboardSlice";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import "./product.css";
import Dropdown from "../../authentication/form-helpers/Dropdown";

function EditStoreModal({ checkLoader }) {
  const dispatch = useDispatch();
  const { name, logo, storeId, categoryItems, categoryId } = useSelector((store) => store.store);

  const data = {
    name: name,
    logo: logo,
    category_id: categoryId
  };

  const headers = authHeader(getCurrentStore());

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/v1/stores/${storeId}`, data, { headers })

      .then((response) => {
        const data = response.data;
        console.log(data);
        checkLoader(1000);
        dispatch(setStore(data));
      });
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
            <h2 className="header">Edit Store Details</h2>
            <br />
            <br />
            <StoreLogo checkLoader={checkLoader} />
            <br />
            <br />
            <form className="ui form ">
              <div className="required field ">
                <label style={{ textAlign: "left" }}>Store Name</label>
                <input
                  type="text"
                  placeholder="Give Your Store Name "
                  onChange={(event) =>
                    dispatch(nameChanger(event.target.value))
                  }
                />
              </div>
              <br />
              <div className="required field">
                <label style={{ textAlign: "left" }}>
                  Select Store's category
                </label>
                <Dropdown
                  categoryItems={categoryItems}
                  categoryId={categoryId}
                />
                <br />
              </div>
              <br />
              <div className="actions">
                <div
                  className="ui green button"
                  onClick={(e) => {
                    handleSubmit(e);
                    dispatch(closeEditStoreModal());
                  }}
                >
                  Save
                </div>
                <div
                  className="ui red button"
                  onClick={() => dispatch(closeEditStoreModal())}
                >
                  Close
                </div>
              </div>
              <br />
              <br />
              <button
                className="ui red button"
                onClick={() => dispatch(openConfirmDeleteStore())}
              >
                Permanently Delete The Store
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default EditStoreModal;
