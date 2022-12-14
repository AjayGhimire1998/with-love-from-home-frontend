import React from "react";
import { logOut } from "../../../../app/services/auth-services/auth-service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FilterContainer from "./FilterContainer";
import { useEffect } from "react";
import axios from "axios";
import {
  getAllProducts,
  getAllStores,
} from "../../../../features/home/homeSlice";
import StoreContainer from "./StoreContainer";
import HomeProductContainer from "./HomeProductsContainer";
import Footer from "../../../static_pages/Footer";
import FilteredResults from "./FilteredResults";

export default function Home({ checkLoader }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStores());
    dispatch(getAllProducts());
  }, []);

  const { filteredStores, filteredProducts } = useSelector(
    (store) => store.home
  );

  return (
    <>
      <div className="ui container">
        <br />
        <br />
        <FilterContainer />
        <br />
        <br />
        <br />
        {filteredProducts !== null || filteredStores !== null ? (
          <FilteredResults checkLoader={checkLoader !== []} />
        ) : null}
        <br />
        <h3 style={{ textAlign: "center" }}>Top Products</h3>
        <hr />
        <br />
        <br />
        <HomeProductContainer />
        <br />
        <br />
        <br />
        <br />
        <h3 style={{ textAlign: "center" }}>All Stores</h3>
        <hr />
        <br />
        <br />
      </div>
      <StoreContainer checkLoader={checkLoader} />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <Footer />
    </>
  );
}
