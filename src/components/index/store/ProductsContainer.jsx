import React from "react";
import Product from "./Product";
// import "./product.css";

function ProductsContainer() {
  return (
    <div style={{ display: "table", height: "100%", margin: "0 auto" }}>
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          textAlign: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Your Products</h2>
        <br />
        <button
          className="ui large green button "
          // onClick={() => navigate("/login")}
        >
          <span style={{ color: "black" }}>Add a new product</span>
        </button>
        <br />
        <br />
        <div className="ui link cards">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </div>
  );
}

export default ProductsContainer;
