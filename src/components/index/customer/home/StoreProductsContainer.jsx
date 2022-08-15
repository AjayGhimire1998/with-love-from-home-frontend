import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import HomeProduct from "./HomeProduct";

function StoreProductsContainer() {
  const [indexCounter, setIndexCounter] = useState(0);
  const { selectedStoreProducts } = useSelector((store) => store.home);
  const storeProductsToDisplay = selectedStoreProducts?.map((product) => {
    return <HomeProduct key={product.id} product={product} />;
  });
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Store's Products</h3>
      <div>
        <div className="ui internally celled equal width grid">
          <br />
          <br />

          <div className="ui link cards centered row">
            {storeProductsToDisplay ? (
              storeProductsToDisplay?.slice(0, 6 + indexCounter)
            ) : (
              <h3 style={{ textAlign: "center" }}>The Store has no products</h3>
            )}
          </div>
        </div>
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <button
            className="ui red icon button"
            onClick={() => setIndexCounter(indexCounter + 6)}
            disabled={indexCounter + 6 >= storeProductsToDisplay?.length}
          >
            Show More
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default StoreProductsContainer;
