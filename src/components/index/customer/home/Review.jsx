import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "../../../static_pages/review.css";

function Review({ review }) {
  const { allCustomers } = useSelector((store) => store.customer);
  const customerName = (allCustomers?.find(
    (customer) => customer.id === review.user_id
  )).fullname;

  return (
    <>
      <div className="testimonial-box-container">
        <div className="testimonial-box">
          <div className="box-top">
            <div className="profile">
              <div className="name-user">
                <strong>
                  {customerName === undefined ? "Customer" : customerName}
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
        </div>
      </div>
    </>
  );
}

export default Review;
