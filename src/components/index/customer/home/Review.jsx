import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "../../../static_pages/review.css";
import ReviewActions from "./ReviewActions";

function Review({ review }) {
  const { allCustomers, customerId } = useSelector((store) => store.customer);
  const customer = allCustomers?.find(
    (customer) => customer.id === review.customer_id
  );

  return (
    <>
      <div className="testimonial-box-container">
        <div className="testimonial-box">
          <div className="box-top">
            <div className="profile">
              <div className="name-user">
                <strong>

                  {customer?.fullname || "Customer"}
                </strong>
              </div>
            </div>

            <div className="reviews">
              {Array.from({ length: review.rating }, (_, i) => (
                <i key={uuidv4()} className="star yellow icon"></i>
              ))}
            </div>
          </div>

          <div className="client-comment">
            <p>"{review.content || `${review.rating} stars`}"</p>
          </div>

          {customerId === review.user_id ? (
            <ReviewActions review={review} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Review;
