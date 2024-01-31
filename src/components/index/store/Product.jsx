import React, { useEffect } from "react";
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
  // setAvailable,
  clearBlankImages,
  replaceRecentlyUpdatedProduct,
  setRecentlyUpdatedProduct,
  clearForm,
  setInStock,
} from "../../../features/dashboard/productSlice";
import ProductsCarouselSlide from "./ProductsCarouselSlide";
import "./modal.css";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import axios from "axios";

function Product({ product, checkLoader }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { isEditProductOpen } = useSelector((store) => store.modal);
  const { name, id, description, price, storeId, inStock } = useSelector(
    (store) => store.product
  );
  const [error, setError] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState(1);

  useEffect(() => {
    setSelectedValue(inStock);
  }, [inStock]);

  console.log(inStock);
  console.log(selectedValue);
  const data = {
    name: name,
    price: price,
    description: description,
    store_id: storeId,
    in_stock: inStock === "Sold Out" ? 0 : inStock,
  };

  console.log(data);
  const headers = authHeader(getCurrentStore());

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!name || !price || !description || !inStock) {
      setError("All fields are required.");
      return; // Prevent form submission
    }
    try {
      await axios
        .put(`${API_URL}/product/products/${id}`, data, { headers })
        .then((response) => {
          // console.log(response.data);
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

  const options = ["Sold Out"].concat(Array.from(Array(31).keys()).slice(1));

  return (
    <div className="card" style={{ margin: "25px" }}>
      {product.in_stock === 0 ? (
        <button id="show-products" className="ui tiny red button">
          <span style={{ color: "white" }}>Out of Stock</span>
        </button>
      ) : null}
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
            <div className="field">
              <label style={{ textAlign: "left" }}>In-Stock</label>
              <select
                onChange={(event) => dispatch(setInStock(event.target.value))}
                value={selectedValue}
              >
                {options.map((opt) => {
                  return (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  );
                })}
              </select>
            </div>
            {error && (
              <small style={{ color: "red" }}>All fields must be filled.</small>
            )}
            <br />
            <br />
            <div className="extra content">
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
          <div
            className="content"
            style={product.in_stock === 0 ? { filter: "blur(1px)" } : null}
          >
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
            <div style={{ fontWeight: "bold" }}>
              In Stock:&nbsp;
              <strong>{product.in_stock}</strong>
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
