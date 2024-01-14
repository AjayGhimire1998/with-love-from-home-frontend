import React from "react";
import { useSelector } from "react-redux";
import HomeProduct from "./HomeProduct";
import Store from "./Store";
import {
  increaseFilteredPageCounter,
  decreaseFilteredPageCounter,
} from "../../../../features/home/homeSlice";
import { useDispatch } from "react-redux";

function FilteredResults({ checkLoader }) {
  const dispatch = useDispatch();

  const { filteredProducts, filteredStores, categoryId, filteredPageCounter } =
    useSelector((store) => store.home);
  const { categoryItems } = useSelector((store) => store.store);

  const categoryName = categoryItems?.map((item) => {
    if (item.id === categoryId) {
      return item.name;
    }
  });

  const eachFilteredProduct = filteredProducts?.map((product) => {
    return <HomeProduct key={product.id} product={product} />;
  });

  const eachFilteredStore = filteredStores?.map((store) => {
    return <Store key={store.id} store={store} checkLoader={checkLoader} />;
  });

  return (
    <>
      <>
        {filteredProducts.length !== 0 ? (
          <>
            <h3 style={{ textAlign: "center" }}>{categoryName}: Products</h3>
            <hr />
            <br />
            <div className="ui internally celled equal width grid">
              <div className="ui link cards centered row">
                {eachFilteredProduct?.slice(
                  filteredPageCounter,
                  filteredPageCounter + 6
                )}
              </div>
            </div>
            <br />
            <br />
            <div style={{ textAlign: "center" }}>
              <button
                className="ui labeled red icon button"
                onClick={() => {
                  dispatch(decreaseFilteredPageCounter());
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
                disabled={filteredPageCounter === 0}
              >
                <i className="left arrow icon"></i>
                Previous
              </button>
              <button
                className="ui right labeled red icon button"
                onClick={() => {
                  dispatch(increaseFilteredPageCounter());
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
                disabled={
                  filteredPageCounter + 6 >= eachFilteredProduct?.length
                }
              >
                <i className="right arrow icon"></i>
                Next
              </button>
            </div>
            <br />
            <br />
          </>
        ) : (
          <h3 style={{ textAlign: "center", color: "red" }}>
            No Products for {categoryName}
          </h3>
        )}
        {filteredStores.length !== 0 ? (
          <>
            <h3 style={{ textAlign: "center" }}>{categoryName} : Stores</h3>
            <hr />
            <br />
            <div className="scrollable">
              <div id="scrollable-cards" className="ui link cards">
                {eachFilteredStore}
              </div>
            </div>
          </>
        ) : (
          <h3 style={{ textAlign: "center", color: "red" }}>
            No Stores for {categoryName}
          </h3>
        )}
      </>
    </>
  );
}

export default FilteredResults;
