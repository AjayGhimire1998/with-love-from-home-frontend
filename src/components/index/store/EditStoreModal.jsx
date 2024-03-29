import React from "react";
import { useDispatch, useSelector } from "react-redux";

import StoreLogo from "../../authentication/form-helpers/StoreLogo";
import { closeEditStoreModal } from "../../../features/dashboard/modalSlice";
import { nameChanger } from "../../../features/auth/storeSlice";
import axios from "axios";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { setStore } from "../../../features/dashboard/dashboardSlice";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import "./product.css";
import Dropdown from "../../authentication/form-helpers/Dropdown";

function EditStoreModal({ checkLoader }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { name, logo, storeId, categoryItems, categoryId } = useSelector(
    (store) => store.store
  );
  const [error, setError] = React.useState(null);

  const data = {
    name: name,
    logo: logo,
    category_id: categoryId,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.logo || !data.category_id) {
      setError("All fields are required.");
      return; // Prevent form submission
    }

    const headers = authHeader(getCurrentStore());
    // console.log(headers);
    await axios
      .put(`${API_URL}store/stores/${storeId}`, data, { headers })

      .then((response) => {
        const data = response.data;
        // console.log(data);
        checkLoader(1000);
        dispatch(setStore(data));
      });
    dispatch(closeEditStoreModal());
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            overflowY: "scroll",
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
          }}
          className="edit-store"
        >
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "center",
              padding: "30px",
              minHeight: "60vh", // Set a minimum height to ensure content visibility
              maxHeight: "80vh",
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
              {error && (
                <small style={{ color: "red" }}>
                  All fields must be filled.
                </small>
              )}
              <br />
              <br />
              <div className="actions">
                <div
                  className="ui green button"
                  onClick={(e) => {
                    handleSubmit(e);
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
              {/* <button
                className="ui red button"
                onClick={() => dispatch(openConfirmDeleteStore())}
              >
                Permanently Delete The Store
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default EditStoreModal;
