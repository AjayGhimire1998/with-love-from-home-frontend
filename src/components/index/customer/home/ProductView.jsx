import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSelectedProduct,
  setImagePreviewIndex,
  increase,
  decrease,
  addToCart,
} from "../../../../features/home/homeproductSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../static_pages/Loader";
import "./product.scss";
import Rate from "./Rate";
import {
  setReviewContent,
  setNewProductReview,
  getSelectedProductReviews,
  setSuccessfulMessage,
} from "../../../../features/home/ratingSlice";
import { authHeader } from "../../../../app/services/auth-services/auth-header";
import { getCurrentUser } from "../../../../app/services/auth-services/auth-service";
import axios from "axios";
import ProductReviewsContainer from "./ProductReviewsContainer";
import Footer from "../../../static_pages/Footer";
import { ChevronDown, ChevronUp } from "../../../../app/services/icons";
import { v4 as uuidv4 } from "uuid";
import { calculateAverageRating } from "../../../../app/services/other-services/service";
import ErrorMessage from "../../../errors/ErrorMessage";

function ProductView() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSelectedProduct(parseInt(id)));
    dispatch(getSelectedProductReviews(parseInt(id)));
  }, [dispatch, id]);

  const { selectedProduct, imagePreviewIndex, amount } = useSelector(
    (store) => store.homeproduct
  );

  const {
    rating,
    reviewContent,
    productReviews,
    successfulMessage,
    errorMessage,
  } = useSelector((store) => store.rating);
  const { customerId } = useSelector((store) => store.customer);

  const outOfStock = () => {
    return selectedProduct.in_stock === 0 
  };

  const miniImages = selectedProduct?.images.map((image, index) => {
    return (
      <div
        key={index}
        style={{ backgroundImage: `url(${image})` }}
        onClick={() => dispatch(setImagePreviewIndex(index))}
      ></div>
    );
  });

  const hasUserReviewedProduct = productReviews?.find(
    (review) => review.customer_id === customerId
  );

  const headers = authHeader(getCurrentUser());

  const data = {
    product_review: {
      content: reviewContent,
      rating: rating,
      product_id: parseInt(id),
      customer_id: customerId,
    },
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}review/product_reviews`, data, { headers })
      .then((response) => {
        dispatch(setNewProductReview(response.data));
        dispatch(
          setSuccessfulMessage(`You have just reviewed ${selectedProduct.name}`)
        );
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
              onClick={() => navigate(-1)}
            >
              <i className="left arrow icon"></i>
              Go Back
            </button>
            <br />
            <br />
            {successfulMessage && <ErrorMessage success={successfulMessage} />}
            {errorMessage && <ErrorMessage error={errorMessage} />}
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
                    <h2>{selectedProduct.name.toUpperCase()}</h2>
                    <span>ID: {selectedProduct.id}</span>
                    {selectedProduct.in_stock === 0 ? (
                      <h4>
                        (
                        <span style={{ color: "red", fontSize: "15px" }}>
                          Out of Stock
                        </span>
                        )
                      </h4>
                    ) : (
                      <h4>In-Stock: {selectedProduct.in_stock}</h4>
                    )}
                  </div>

                  <div className="price">
                    AU$ <span>{selectedProduct.price}</span>
                  </div>
                  <div className="description">
                    <p>{selectedProduct.description}</p>
                  </div>
                  <br />
                  <div>
                    <button
                      className="amount-btn"
                      disabled={outOfStock() || amount === selectedProduct.in_stock}
                      onClick={() => {
                        dispatch(increase());
                      }}
                    >
                      <ChevronUp />
                    </button>
                    <p className="amount">{amount}</p>
                    <button
                      className="amount-btn"
                      disabled={outOfStock()}
                      onClick={() => {
                        dispatch(decrease());
                      }}
                    >
                      <ChevronDown />
                    </button>
                  </div>
                  <br />
                  <button
                    className="buy--btn"
                    disabled={amount === 0 || outOfStock()}
                    onClick={() => {
                      dispatch(addToCart());
                      dispatch(
                        setSuccessfulMessage(
                          `You've added ${selectedProduct.name} to your cart`
                        )
                      );
                    }}
                  >
                    ADD TO CART
                  </button>
                  <button
                    className="buy--btn--2"
                    onClick={() => {
                      navigate(`/stores/${selectedProduct.store_id}`);
                    }}
                  >
                    VIEW STORE
                  </button>
                  <br />
                  <br />
                  <br />
                  <div className="extra content">
                    <span>Ratings: </span>
                    {Array.from(
                      { length: calculateAverageRating(productReviews) },
                      (_, i) => (
                        <i key={uuidv4()} className="star yellow icon"></i>
                      )
                    )}
                  </div>
                  <br />
                  {hasUserReviewedProduct ? null : (
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
                              rating === 0 && reviewContent === ""
                                ? true
                                : false
                            }
                            onClick={handleReviewSubmit}
                          >
                            Rate
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
