import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsReviewEditOpenToFalse,
  setIsReviewEditOpenToTrue,
  setReviewContent,
  setErrorMessage,
  setRecentlyUpdatedReview,
  replaceRecentlyUpdatedReview,
  replaceRecentlyUpdatedStoreReview,
  eraseDeletedReview,
  eraseDeletedStoreReview,
  setSuccessfulMessage,
} from "../../../../features/home/ratingSlice";
import Rate from "./Rate";
import axios from "axios";
import { authHeader } from "../../../../app/services/auth-services/auth-header";
import { getCurrentUser } from "../../../../app/services/auth-services/auth-service";

function ReviewActions({ review }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { isReviewEditOpen, rating, reviewContent } = useSelector(
    (store) => store.rating
  );

  const productReviewData = {
    product_review: {
      content: reviewContent,
      rating: rating,
    },
  };

  const storeReviewData = {
    review: {
      content: reviewContent,
      rating: rating,
    },
  };
  const headers = authHeader(getCurrentUser());

  const handleProductReviewEdit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${API_URL}review/product_reviews/${review.id}`,
        productReviewData,
        { headers }
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(setRecentlyUpdatedReview(response.data));
          dispatch(replaceRecentlyUpdatedReview());
          dispatch(setIsReviewEditOpenToFalse());
          dispatch(setSuccessfulMessage("Review is Successfully Updated."));
        } else {
          dispatch(setErrorMessage("Something Went Wrong"));
        }
      });
  };

  const handleStoreReviewEdit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${API_URL}review/store_reviews/${review.id}`,
        storeReviewData,
        { headers }
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          dispatch(setRecentlyUpdatedReview(response.data));
          dispatch(replaceRecentlyUpdatedStoreReview());
          dispatch(setIsReviewEditOpenToFalse());
          dispatch(setSuccessfulMessage("Review is Successfully Updated."));
        } else {
          dispatch(setErrorMessage("Something Went Wrong"));
        }
      });
  };

  const handleProductReviewDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_URL}review/product_reviews/${review.id}`, {
        headers,
      })
      .then(() => {
        dispatch(eraseDeletedReview(review.id));
        dispatch(setSuccessfulMessage("Review is Successfully Deleted."));
      });
  };

  const handleStoreReviewDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_URL}review/store_reviews/${review.id}`, {
        headers,
      })
      .then(() => {
        dispatch(eraseDeletedStoreReview(review.id));
        dispatch(setSuccessfulMessage("Review is Successfully Deleted."));
      });
  };
  return (
    <div>
      <br />
      <br />
      <button
        className="ui mini primary button"
        disabled={isReviewEditOpen}
        onClick={() => dispatch(setIsReviewEditOpenToTrue())}
      >
        Edit
      </button>
      <br />
      {isReviewEditOpen ? (
        <>
          <br />
          <Rate />
          <br />
          <textarea
            placeholder="Give Review"
            rows={5}
            onChange={(event) => dispatch(setReviewContent(event.target.value))}
          />
          <br />
          <button
            className="ui mini green left floated button"
            disabled={rating === 0 && reviewContent === "" ? true : false}
            onClick={(e) => {
              if (review.product_id) {
                handleProductReviewEdit(e);
              } else if (review.store_id) {
                handleStoreReviewEdit(e);
              }
            }}
          >
            Rate
          </button>
          <button
            className="ui mini red center floated button"
            onClick={() => dispatch(setIsReviewEditOpenToFalse())}
          >
            Cancel
          </button>
          <br />
        </>
      ) : null}
      <br />
      <button
        className="ui mini red button"
        onClick={(e) => {
          if (review.product_id) {
            handleProductReviewDelete(e);
          } else if (review.store_id) {
            handleStoreReviewDelete(e);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default ReviewActions;
