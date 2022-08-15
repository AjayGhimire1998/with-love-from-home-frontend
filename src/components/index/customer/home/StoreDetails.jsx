import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import {
  setSelectedStore,
  setSelectedStoreProducts
} from "../../../../features/home/homeSlice";
import Footer from "../../../static_pages/Footer";
import Loader from "../../../static_pages/Loader";
import StoreProductsContainer from "./StoreProductsContainer";
import Rate from "./Rate";
import { authHeader } from "../../../../app/services/auth-services/auth-header";
import { getCurrentUser } from "../../../../app/services/auth-services/auth-service";
import {
  getStoreReviews,
  setNewStoreReview,
  setReviewContent,
} from "../../../../features/home/ratingSlice";
import ReviewsContainer from "./ReviewsContainer";

function StoreDetails() {
  const { id } = useParams();
  useEffect(() => {
    dispatch(setSelectedStore(parseInt(id)));
    dispatch(setSelectedStoreProducts(parseInt(id)));
    dispatch(getStoreReviews(parseInt(id)));
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedStore, selectedStoreProducts } = useSelector(
    (store) => store.home
  );

  const { rating, reviewContent } = useSelector((store) => store.rating);
  const { customerId } = useSelector((store) => store.customer);
  const headers = authHeader(getCurrentUser());

  const data = {
    review: {
      content: reviewContent,
      rating: rating,
      store_id: parseInt(id),
      user_id: customerId,
    },
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/v1/reviews", data, { headers })
      .then((response) => {
        dispatch(setNewStoreReview(response.data));
      });
  };

  // const 

  return (
    <>
      {selectedStore === null || selectedStoreProducts === null ? (
        <Loader />
      ) : (
        <div className=" ui container">
          <br />
          <button
            className="ui labeled primary icon button"
            onClick={() => navigate("/")}
          >
            <i className="left arrow icon"></i>
            Go Back
          </button>
          <br />
          <br />
          <br />
          {/* <div className="ui stackable grid"> */}
          <div className="ui  stackable aligned grid">
            <div
              className="left floated right aligned six wide column"
              style={{
                backgroundImage: `url(${
                  selectedStore && selectedStore?.store.current_store.logo
                })`,
                height: "400px",
                width: "400px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="right floated left aligned six wide column"
              // style={{ textAlign: "center" }}
            >
              <h1>
                {selectedStore && selectedStore?.store.current_store.name}
              </h1>
              <span
                style={{
                  color: "darkred",
                  fontSize: "22px",
                  fontWeight: "bolder",
                }}
              >
                {selectedStore.store.category_name}
              </span>
              <br />
              <br />

              <div className="extra content">
                <span>Ratings: </span>
                {/* <section>
                {Array.from({ length: review.rating }, (_, i) => (
                  <i key={uuidv4()} className="star yellow icon"></i>
                ))}
              </section> */}
              </div>
              <br />
              <div className="ui column card">
                <div className="content">
                  <div className=" header">
                    Rate&nbsp;
                    {selectedStore && selectedStore?.store.current_store.name} ?
                  </div>
                  <div className="description">
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
          {/* </div> */}
          <br />
          <br />
          <br />
          <StoreProductsContainer />
          <br />
          <hr />
          <br />
          <ReviewsContainer />
        </div>
      )}
      <Footer />
    </>
  );
}

export default StoreDetails;
