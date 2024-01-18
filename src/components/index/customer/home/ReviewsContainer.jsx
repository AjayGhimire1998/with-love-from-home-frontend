import React from "react";
import { useSelector } from "react-redux";
import Review from "./Review";
import "./home.css";
import "../../../static_pages/review.css";

function ReviewsContainer() {
  const { storeReviews } = useSelector((store) => store.rating);
  
  const eachReview = storeReviews?.map((review) => {
    return <Review key={review.id} review={review} />;
  });

  // console.log(eachReview);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Reviews</h2>
      <br />
      <section id="testimonials">{eachReview}</section>
    </>
  );
}

export default ReviewsContainer;
