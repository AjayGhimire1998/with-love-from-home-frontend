import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getStore } from "../../../app/services/auth-services/auth-service";
import { isCustomerLoggedInChanger } from "../../../features/auth/customerSlice";
import {
  getCurrentStore,
  setStore,
} from "../../../features/dashboard/dashboardSlice";
import axios from "axios";
import ProductsContainer from "./ProductsContainer";

function Dashboard() {
  const { store } = useSelector((store) => store.dashboard);
  const { storeId } = useSelector((store) => store.store);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/v1/stores/${storeId}`,
        JSON.stringify({
          headers: authHeader,
        })
      )
      .then((response) => {
        const data = response.data;
        dispatch(setStore(data));
      });
  }, []);

  return (
    <>
      <div
        className="ui inverted vertical masthead center aligned segment"
        style={{
          backgroundImage: `url(${store.logo})`,
          backgroundSize: "cover",
        }}
      >
        <div className="ui text container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1
            className="ui inverted center "
            style={{
              fontFamily: "monospace",
              fontSize: "50px",
              textShadow: "4px 6px black",
              WebkitTextStroke: "2px black",
            }}
          >
            Welcome, {store.name}
          </h1>
          <h3
            style={{
              fontFamily: "monospace",
              fontSize: "35px",
              textShadow: "2px 2px black",
              fontWeight: "bolder",
              WebkitTextStroke: "1px black",
            }}
          >
            Sellling: {store.category_id}
          </h3>
          <br />
          <br />
          <button
            className="ui huge yellow button "
            // onClick={() => navigate("/login")}
          >
            <span style={{ color: "black" }}>Edit</span>
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <br />
      <br />
      <ProductsContainer />
    </>
  );
}

export default Dashboard;
