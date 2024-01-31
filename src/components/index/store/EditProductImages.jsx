import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import { closeEditImageModal } from "../../../features/dashboard/modalSlice";
import {
  clearBlankImages,
  setRecentlyUpdatedProduct,
  replaceRecentlyUpdatedProduct,
} from "../../../features/dashboard/productSlice";
import ProductImagesUpload from "./ProductImagesUpload";
import "./modal.css";

function EditProductImages({ checkLoader }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const { id, name, productImages } = useSelector(
    (store) => store.product
  );
  const dispatch = useDispatch();

  const headers = authHeader(getCurrentStore());
  const data = {
    images: productImages.slice(1),
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_URL}/product/products/${id}`, data, { headers })
      .then((response) => {
        console.log(response.data);
        dispatch(setRecentlyUpdatedProduct(response.data));
        dispatch(replaceRecentlyUpdatedProduct());
      });
    checkLoader(2000);
    dispatch(closeEditImageModal());
    dispatch(clearBlankImages());
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
            <h4>Edit&nbsp;{name}&nbsp;images</h4>
            <br />
            <br />
            <ProductImagesUpload checkLoader={checkLoader} />
            <div className="ui green button" onClick={handleSubmit}>
              Save
            </div>
            <div
              className="ui red button"
              onClick={() => {
                dispatch(closeEditImageModal());
                dispatch(clearBlankImages());
              }}
            >
              Close
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default EditProductImages;
