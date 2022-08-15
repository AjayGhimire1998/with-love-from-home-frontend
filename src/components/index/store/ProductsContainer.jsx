import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openNewProductModal } from "../../../features/dashboard/modalSlice";
import {
  clearBlankImages,
  clearForm,
} from "../../../features/dashboard/productSlice";
import Product from "./Product";

function ProductsContainer({ checkLoader }) {
  const dispatch = useDispatch();
  const { allStoreProducts } = useSelector((store) => store.product);

  const eachProductToDisplay = allStoreProducts?.map((product) => {
    return (
      <Product key={product.id} product={product} checkLoader={checkLoader} />
    );
  });
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ textAlign: "center" }}>Your Products</h2>
        <br />
        <button
          className="ui large green button "
          onClick={() => {
            dispatch(clearForm());
            dispatch(clearBlankImages());
            dispatch(openNewProductModal());
          }}
        >
          <span style={{ color: "black", float: "center" }}>
            Add a new product
          </span>
        </button>
        <br />
        <div className="ui internally celled equal width grid">
          <br />
          <br />
          <div className="ui link cards centered row">
            {eachProductToDisplay}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsContainer;
