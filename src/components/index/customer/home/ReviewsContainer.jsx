import React from "react";
import { useSelector } from "react-redux";
import Review from "./Review";
import "./home.css";

function ReviewsContainer() {
  const { storeReviews } = useSelector((store) => store.rating);

  const eachReview = storeReviews?.map((review) => {
    return <Review key={review.id} review={review} />;
  });

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Reviews</h2>
      <br/>
      <div className="scrollable">
        <div id="scrollable-cards" className="ui link cards">
          {eachReview}
        </div>
      </div>
    </>
  );
}

export default ReviewsContainer;
