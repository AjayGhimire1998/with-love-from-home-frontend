import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getStoreOrders, setStore } from "../../../features/dashboard/dashboardSlice";
import axios from "axios";
import ProductsContainer from "./ProductsContainer";
import EditStoreModal from "./EditStoreModal";
import { openEditStoreModal } from "../../../features/dashboard/modalSlice";
import NewProductFormModal from "./NewProductFormModal";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import { setAllStoreProducts } from "../../../features/dashboard/productSlice";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import EditProductImages from "./EditProductImages";
import Footer from "../../static_pages/Footer";

function Dashboard({ checkLoader }) {
  const { store } = useSelector((store) => store.dashboard);
  const { storeId } = useSelector((store) => store.store);
  const {
    isEditStoreOpen,
    isNewProductOpen,
    isConfirmDeleteOpen,
    isEditImagesOpen,
  } = useSelector((store) => store.modal);

  const dispatch = useDispatch();
  const headers = authHeader(getCurrentStore());

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/stores/${storeId}`, { headers })
      .then((response) => {
        const data = response.data;
        dispatch(setStore(data));
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/stores/${storeId}/products`, {
        headers,
      })
      .then((response) => {
        dispatch(setAllStoreProducts(response.data));
      });
  }, []);

  useEffect(() => {
    dispatch(getStoreOrders(storeId))
  },[])

  return (
    <>
      {isEditStoreOpen && <EditStoreModal checkLoader={checkLoader} />}
      {isNewProductOpen && <NewProductFormModal checkLoader={checkLoader} />}
      {isConfirmDeleteOpen && <ConfirmDeleteModal checkLoader={checkLoader} />}
      {isEditImagesOpen && <EditProductImages checkLoader={checkLoader} />}
      <div
        className="ui inverted vertical masthead center aligned segment"
        style={{
          backgroundImage: `url(${store?.store.current_store.logo})`,
          backgroundSize: "cover ",
        }}
      >
        <div className="ui text container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div
            style={{
              display: "inline-block",
              background: "rgba(0, 0, 0, .2",
            }}
          >
            <h1
              className="ui inverted center "
              style={{
                fontFamily: "monospace",
                fontSize: "50px",
                textShadow: "4px 6px black",
                WebkitTextStroke: "2px black",
              }}
            >
              Welcome, {store?.store.current_store.name}
            </h1>
            <h3
              style={{
                fontFamily: "monospace",
                fontSize: "35px",
                textShadow: "2px 2px black",
                fontWeight: "bold",
                WebkitTextStroke: "1px black",
              }}
            >
              You are Selling&nbsp;
              <strong style={{ color: "aqua" }}>
                {store?.store.category_name}
              </strong>
            </h3>
          </div>
          <br />
          <br />
          <button
            className="ui huge yellow button "
            onClick={() => {
              dispatch(openEditStoreModal());
            }}
          >
            <span style={{ color: "black" }}>Edit Store</span>
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <br />
      <br />
      <ProductsContainer checkLoader={checkLoader} />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Dashboard;
