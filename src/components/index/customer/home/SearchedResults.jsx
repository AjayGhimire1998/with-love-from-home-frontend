import React from "react";
import { useNavigate } from "react-router";
import { clearSearch } from "../../../../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";

function SearchedResults() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedStores, searchedProducts } = useSelector(
    (store) => store.home
  );
  return (
    <>
      {searchedProducts.length !== 0 ? (
        <div>
          <br />
          <h4>Products:</h4>
          <hr />
          <div>
            {searchedProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="search-results"
                  onClick={() => {
                    navigate(`/products/${product.id}`);
                    dispatch(clearSearch());
                  }}
                  style={{
                    textAlign: "left",
                    borderBottom: "black ridge 1px",
                    width: "auto",
                    padding: "10px",
                    display: "flex",
                  }}
                >
                  {product.name}
                  <img
                    src={product.images[0]}
                    alt="store-logo"
                    style={{
                      height: "25px",
                      width: "25px",
                      marginLeft: "auto",
                      order: "2",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {searchedStores.length !== 0 ? (
        <div>
          <br />
          <h4>Stores:</h4>
          <hr />
          <div>
            {searchedStores.map((store) => {
              return (
                <div
                  key={store.id}
                  className="search-results"
                  onClick={() => {
                    navigate(`/stores/${store.id}`);
                    dispatch(clearSearch());
                  }}
                  style={{
                    textAlign: "left",
                    borderBottom: "black ridge 1px",
                    width: "auto",
                    padding: "10px",
                    display: "flex",
                  }}
                >
                  {store.name}
                  <img
                    src={store.logo}
                    alt="store-logo"
                    style={{
                      height: "25px",
                      width: "25px",
                      marginLeft: "auto",
                      order: "2",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SearchedResults;
