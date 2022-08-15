import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSelectedProduct,
  setImagePreviewIndex,
} from "../../../../features/home/homeproductSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../static_pages/Loader";
import "./product.scss";
import Rate from "./Rate";
import {
  setReviewContent,
  setNewProductReview,
  getSelectedProductReviews,
} from "../../../../features/home/ratingSlice";
import { authHeader } from "../../../../app/services/auth-services/auth-header";
import { getCurrentUser } from "../../../../app/services/auth-services/auth-service";
import axios from "axios";
import ProductReviewsContainer from "./ProductReviewsContainer";
import Footer from "../../../static_pages/Footer";

function ProductView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSelectedProduct(parseInt(id)));
    dispatch(getSelectedProductReviews(parseInt(id)));
  }, []);

  const { selectedProduct, imagePreviewIndex } = useSelector(
    (store) => store.homeproduct
  );

  const miniImages = selectedProduct?.images.map((image, index) => {
    return (
      <div
        key={index}
        style={{ backgroundImage: `url(${image})` }}
        onClick={() => dispatch(setImagePreviewIndex(index))}
      ></div>
    );
  });

  const { rating, reviewContent } = useSelector((store) => store.rating);
  const { customerId } = useSelector((store) => store.customer);
  const headers = authHeader(getCurrentUser());

  const data = {
    product_review: {
      content: reviewContent,
      rating: rating,
      product_id: parseInt(id),
      user_id: customerId,
    },
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/v1/product_reviews", data, { headers })
      .then((response) => {
        dispatch(setNewProductReview(response.data));
      });
  };

  return (
    <>
      {selectedProduct === null ? (
        <Loader />
      ) : (
        <>
          <br />
          <div className="ui container">
            <button
              className="ui labeled primary icon button"
              onClick={() => navigate("/")}
            >
              <i className="left arrow icon"></i>
              Go Back
            </button>
            <br />
            <br />
            <div className="ui stackable two column grid">
              <div className="column">
                <div className="variant">{miniImages}</div>
                <img
                  className="photo-main"
                  src={selectedProduct?.images[imagePreviewIndex]}
                  alt="green apple slice"
                />
              </div>
              <div
                className="right floated column"
                style={{ textAlign: "center" }}
              >
                <br />
                <br />
                <div className="product__info">
                  <div className="title">
                    <h2>{selectedProduct.name}</h2>
                    <span>ID: {selectedProduct.id}</span>
                  </div>
                  <br />
                  <div className="price">
                    AU$ <span>{selectedProduct.price}</span>
                  </div>

                  <div className="description">
                    <h3>DESCRIPTION</h3>
                    <p>{selectedProduct.description}</p>
                  </div>
                  <br />
                  <button className="buy--btn">ADD TO CART</button>
                  <button
                    className="buy--btn--2"
                    onClick={() => {
                      navigate(`/stores/${selectedProduct.store_id}`);
                      window.location.reload();
                    }}
                  >
                    VIEW STORE
                  </button>
                  <br />
                  <br />
                  <br />
                  <div className="extra content">
                    <span>Ratings: </span>
                    <i className="star yellow icon"></i>
                  </div>
                  <br />
                  <div className="ui centered column card">
                    <div className="content">
                      <div className=" header" style={{ float: "left" }}>
                        Rate&nbsp;
                        {selectedProduct && selectedProduct?.name}?
                      </div>
                      <br />
                      <div className="description" style={{ float: "left" }}>
                        <Rate />
                        <br />
                        <textarea
                          placeholder="Give Review"
                          rows={5}
                          value={reviewContent}
                          onChange={(e) =>
                            dispatch(setReviewContent(e.target.value))
                          }
                        />
                        <br />
                        <button
                          className="ui mini green left floated button"
                          disabled={
                            rating === 0 && reviewContent === "" ? true : false
                          }
                          onClick={handleReviewSubmit}
                        >
                          Rate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <hr />
          <br />
          <ProductReviewsContainer />
          <Footer />
        </>
      )}
    </>
  );
}

export default ProductView;
