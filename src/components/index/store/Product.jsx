import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openEditProductModal,
  openConfirmDeleteModal,
  closeEditProductModal,
  openEditImagesModal,
} from "../../../features/dashboard/modalSlice";
import {
  setDeleteProduct,
  setEditProduct,
  setEditProductImages,
  setName,
  setDescription,
  setPrice,
  clearBlankImages,
  replaceRecentlyUpdatedProduct,
  setRecentlyUpdatedProduct,
  clearForm,
} from "../../../features/dashboard/productSlice";
import ProductsCarouselSlide from "./ProductsCarouselSlide";
import "./modal.css";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import axios from "axios";

function Product({ product, checkLoader }) {
  const dispatch = useDispatch();
  const { isEditProductOpen } = useSelector((store) => store.modal);
  const { name, id, description, price, storeId } = useSelector(
    (store) => store.product
  );

  const data = {
    name: name,
    price: price,
    description: description,
    store_id: storeId,
  };

  const headers = authHeader(getCurrentStore());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`http://localhost:3001/api/v1/products/${id}`, data, { headers })
        .then((response) => {
          console.log(response.data);
          dispatch(setRecentlyUpdatedProduct(response.data));
          dispatch(replaceRecentlyUpdatedProduct());
        });
    } catch (error) {
      console.log(error);
    }
    checkLoader(2000);
    dispatch(closeEditProductModal());
    dispatch(clearForm());
    dispatch(clearBlankImages());
  };
  return (
    <div className="card" style={{ margin: "25px" }}>
      <div className="image">
        <ProductsCarouselSlide imagesToPreview={product.images} />
        <button
          id="change-images"
          className="ui button tiny yellow"
          style={{ display: "inline-block" }}
          onClick={() => {
            dispatch(openEditImagesModal());
            dispatch(setEditProductImages(product.id));
          }}
        >
          <span style={{ color: "black" }}>Change Images</span>
        </button>
      </div>

      {isEditProductOpen && product.id === id ? (
        <div className="content">
          <form className="ui form ">
            <div className="field ">
              <label style={{ textAlign: "left" }}>Name</label>
              <input
                type="text"
                placeholder="Name Your Product "
                value={name}
                onChange={(event) => dispatch(setName(event.target.value))}
              />
            </div>
            <div className="field ">
              <label style={{ textAlign: "left" }}>Description</label>
              <textarea
                type="text"
                placeholder="Describe Your Product "
                value={description}
                rows={5}
                cols={5}
                onChange={(event) =>
                  dispatch(setDescription(event.target.value))
                }
              />
            </div>
            <div className="field ">
              <label style={{ textAlign: "left" }}>Set Price</label>
              <div className="ui right labeled input">
                <input
                  type="text"
                  placeholder="Amount"
                  id="amount"
                  value={price}
                  onChange={(event) => dispatch(setPrice(event.target.value))}
                />
                <div className="ui basic label">AUD</div>
              </div>
            </div>
            <br />
            <div class="extra content">
              <button className="ui green button" onClick={handleSubmit}>
                Save
              </button>
              <button
                className="ui red button"
                onClick={() => {
                  dispatch(closeEditProductModal());
                  dispatch(clearBlankImages());
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="content">
            <div className="header">{product.name}</div>
            <br />
            <div
              className="meta"
              style={{ color: "darkred", fontWeight: "bold" }}
            >
              Price:&nbsp;
              <strong style={{ color: "green", fontSize: "20px" }}>
                {product.price.toFixed(2)}
              </strong>
              <small>
                <i>AUD</i>
              </small>
            </div>
            <br />
            <div
              className="description"
              style={{
                display: "inline-block",
                background: "rgba(0, 0, 0, .07",
                fontWeight: "bold",
              }}
            >
              {product.description}
            </div>
          </div>
          <br />
          <br />
          <div className="extra content">
            <button
              className="ui button tiny right floated red"
              onClick={() => {
                dispatch(openConfirmDeleteModal());
                dispatch(setDeleteProduct(product.id));
              }}
            >
              Delete
            </button>
            <button
              className="ui button tiny left floated blue"
              onClick={() => {
                dispatch(openEditProductModal());
                dispatch(setEditProduct(product.id));
              }}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
