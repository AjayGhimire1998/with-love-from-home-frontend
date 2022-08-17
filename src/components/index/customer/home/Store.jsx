import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import {
  setIsDimmerOnHover,
  setHoveredStore,
  eraseSelectedStore,
  setSelectedStore,
  setViewingStore,
} from "../../../../features/home/homeSlice";
import "./home.css";
import Rate from "./Rate";

function Store({ store, checkLoader }) {
  const { categoryItems } = useSelector((store) => store.store);
  const { isDimmerOnHover, hoveredStore } = useSelector((store) => store.home);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className="card" style={{ margin: "15px" }}>
      <div
        className="image"
        onMouseOver={() => {
          dispatch(setIsDimmerOnHover(true));
          dispatch(setHoveredStore(store.id));
        }}
        onMouseOut={() => {
          dispatch(setIsDimmerOnHover(false));
          dispatch(eraseSelectedStore());
        }}
      >
        {isDimmerOnHover && store.id === hoveredStore.id ? (
          <div>
            <img
              src={store.logo}
              alt="store"
              style={{
                filter: "blur(3px)",
                width: 290,
                height: 260,
                objectFit: "cover",
              }}
            />
            <button
              id="show-products"
              className="ui tiny yellow button"
              onClick={() => {
                navigate(`/stores/${store.id}`);
              }}
            >
              See Products
            </button>
          </div>
        ) : (
          <img
            src={store.logo}
            alt="store"
            style={{ width: 290, height: 260, objectFit: "cover" }}
          />
        )}
      </div>
      <div className="content">
        <div
          className="header"
          style={{
            fontSize: "25px",
            textAlign: "center",
            backgroundColor: "rgba(194, 139, 0, 0.5)",
            fontWeight: "bolder",
          }}
        >
          {store.name}
        </div>
        <br />
        <div className="description">
          Category:&nbsp;
          <span
            style={{
              color: "darkred",
              fontSize: "18px",
              fontWeight: "bolder",
            }}
          >
            {categoryItems.find((cat) => cat.id === store.category_id).name}
          </span>
        </div>
      </div>
      <div className="extra content">
        <span className="right floated">
          <i className="star  yellow icon"></i>
        </span>
        <span>Ratings:</span>
      </div>
    </div>
  );
}

export default Store;
