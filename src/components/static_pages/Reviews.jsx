import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import "./review.css";
import Loader from "./Loader";
// import { calculateAverageRating } from "../../app/services/other-services/service";

function Reviews() {
  // const dispatch = useDispatch();

  const { staticReviews } = useSelector((store) => store.static);
  const { allCustomers } = useSelector((store) => store.customer);

  return (
    <>
      <h1
        className="ui header"
        style={{
          textAlign: "center",
          color: "whitesmoke",
          fontFamily: "monospace",
          fontSize: "30px",
          textShadow: "2px 2px black",
          fontWeight: "bolder",
          WebkitTextStroke: "1px black",
        }}
      >
        Reviews
      </h1>
      <section id="testimonials">
        {staticReviews?.map((review) => {
          return (
            <div className="testimonial-box-container" key={review.id}>
              <div className="testimonial-box">
                <div className="box-top">
                  <div className="profile">
                    <div className="name-user">
                      <strong>
                        {allCustomers.length !== 0 ? (
                          allCustomers?.find(
                            (customer) => customer.id === review.user_id
                          )?.fullname
                        ) : (
                          <Loader />
                        )}
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
                  <p>{review.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Reviews;
