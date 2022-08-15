import React from "react";
import { useSelector } from "react-redux";
import HomeProduct from "./HomeProduct";
import { useDispatch } from "react-redux";
import {
  increasePageCounter,
  decreasePageCounter,
} from "../../../../features/home/homeSlice";

function HomeProductContainer() {
  const { allProducts } = useSelector((store) => store.home);
  const dispatch = useDispatch();
  const { pageCounter } = useSelector((store) => store.home);
  const homeProductsToDisplay = allProducts.products?.map((product) => {
    return <HomeProduct key={product.id} product={product} />;
  });
  return (
    <>
      <div className="ui internally celled equal width grid">
        <br />
        <br />
        <div className="ui link cards centered row">
          {homeProductsToDisplay?.slice(pageCounter, pageCounter + 6)}
        </div>
      </div>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <button
          className="ui labeled red icon button"
          onClick={() => {
            dispatch(decreasePageCounter());
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          disabled={pageCounter === 0}
        >
          <i className="left arrow icon"></i>
          Previous
        </button>
        <button
          className="ui right labeled red icon button"
          onClick={() => {
            dispatch(increasePageCounter());
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          disabled={pageCounter + 6 >= homeProductsToDisplay?.length}
        >
          <i className="right arrow icon"></i>
          Next
        </button>
      </div>
    </>
  );
}

export default HomeProductContainer;
