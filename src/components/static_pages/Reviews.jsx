import React from "react";
import { First, Second } from "./carousel_images/images";
import { v4 as uuidv4 } from 'uuid';
function Reviews() {
  const reviews = [
    {
      username: "supertramp98",
      role: "customer",
      review: "Best home shopping experience !!🤩",
      stars: 5,
      image: First,
    },
    {
      username: "blackieBOIIIII",
      role: "store",
      review: "I can sell home-made cookies to lovely people around.🥰 ",
      stars: 4,
      image: Second,
    },
    {
      username: "blackieBOIIIII",
      role: "store",
      review: "I can sell home-made cookies to lovely people around.🥰 ",
      stars: 5,
      image: Second,
    },
    {
      username: "blackieBOIIIII",
      role: "store",
      review: "I can sell home-made cookies to lovely people around.🥰 ",
      stars: 5,
      image: Second,
    },
    {
      username: "blackieBOIIIII",
      role: "store",
      review: "I can sell home-made cookies to lovely people around.🥰 ",
      stars: 5,
      image: Second,
    },
  ];
  return (
    <div className="pusher">
      <div className="ui vertical stripe quote segment">
        <br />
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
        <div className="ui equal width stackable internally celled grid">
          <div className="center aligned row">
            <br />

            {reviews.map((review) => {
              return (
                <div key={uuidv4()}className="column">
                  <h3>"{`${review.review}`}"</h3>
                  <p>
                    <img
                      src={`${review.image}`}
                      className="ui avatar image"
                      alt="hehe"
                    />
                    {`${review.username}`}
                  </p>
                  <section>
                    {Array.from({ length: review.stars }, (_, i) => (
                      <i key={uuidv4()} className="star yellow icon"></i>
                    ))}
                  </section>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
            
  );
}

export default Reviews;
