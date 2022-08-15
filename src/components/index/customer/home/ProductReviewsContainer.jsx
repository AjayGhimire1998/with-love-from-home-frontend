import React from 'react'
import { useSelector } from 'react-redux'
import Review from './Review';

function ProductReviewsContainer() {
  const { productReviews} = useSelector((store) => store.rating);

  const eachProductReview = productReviews?.map((review) =>{
    return <Review key = {review.id} review={review} />;
  });

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Reviews</h2>
      <br/>
      <div className="scrollable">
        <div id="scrollable-cards" className="ui link cards">
          {eachProductReview}
        </div>
      </div>
    </>
  )
}

export default ProductReviewsContainer