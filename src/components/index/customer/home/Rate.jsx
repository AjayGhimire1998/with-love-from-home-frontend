import React from "react";

import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { setRating } from "../../../../features/home/ratingSlice";

const Rate = () => {
  const dispatch = useDispatch();
  const ratingChanged = (newRating) => {
    dispatch(setRating(newRating))
  }

  const {rating} = useSelector((store) => store.rating)
console.log(rating)
  return (
    <ReactStars
      count={5}
      value={0}
      onChange={ratingChanged}
      size={24}
      isHalf={false}
      emptyIcon={<i className="far fa-star"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    />
  );
};

export default Rate;
