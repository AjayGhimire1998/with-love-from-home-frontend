import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { setImagePreviewIndex } from "../../../../features/home/homeproductSlice";
import ProductsCarouselSlide from "../../store/ProductsCarouselSlide";

function HomeProduct({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="card" style={{ margin: "25px" }}>
        <div className="image">
          <ProductsCarouselSlide imagesToPreview={product.images} />
        </div>
        <div className="content">
          <div
            className="header"
            style={{
              fontSize: "25px",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              fontWeight: "bolder",
            }}
          >
            {product.name}
          </div>
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
          <div className="description">
            {product.description.slice(0, 20, 1)}...
          </div>
        </div>
        <div className="extra content ">
          <button
            className="ui yellow button fluid"
            onClick={() => {
              navigate(`/products/${product.id}`);
              dispatch(setImagePreviewIndex(0));
            }}
          >
            <span style={{ color: "black" }}>View Details</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeProduct;
