import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Review({ review }) {
  const { allCustomers } = useSelector((store) => store.customer);
  const customerName = (allCustomers?.find(
    (customer) => customer.id === review.user_id
  )).fullname;

  return (
    <div className="pusher">
      <div className="ui vertical stripe quote segment">
        <div className="ui equal width stackable internally celled grid">
          <div className="center aligned row">
            <div className="column" style={{borderRight: "1px solid black"}}>
              <h3>"{review.content || `${review.rating} stars`}"</h3>
              <p>{customerName === undefined ? "Customer" : customerName}</p>
              <section>
                {Array.from({ length: review.rating }, (_, i) => (
                  <i key={uuidv4()} className="star yellow icon"></i>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
