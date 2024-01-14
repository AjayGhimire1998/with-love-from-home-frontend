import React from "react";
import { useSelector } from "react-redux";
import Store from "./Store";
import "./home.css";

function StoreContainer({ checkLoader }) {
  const { allStores } = useSelector((store) => store.home);

  const eachStore = allStores.map((store) => {
    return <Store key={store.id} store={store} checkLoader={checkLoader} />;
  });
  return (
    <div className="scrollable">
      <div id="scrollable-cards" className="ui link cards">
        {eachStore }
      </div>
    </div>
  );
}

export default StoreContainer;
