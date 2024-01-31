import React from "react";
// import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import {
  getStoreOrders,
  setStore,
} from "../../../features/dashboard/dashboardSlice";
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
import ConfirmStoreDelete from "./ConfirmStoreDelete";

function Dashboard({ checkLoader }) {
  // const storeId = localStorage.getItem("id");
  // const API_URL = process.env.REACT_APP_API_URL;
  const { store } = useSelector((store) => store.dashboard);
  // const { storeId } = useSelector((store) => store.store);
  const {
    isEditStoreOpen,
    isNewProductOpen,
    isConfirmDeleteOpen,
    isEditImagesOpen,
    isDeleteStoreOpen,
  } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    const storeId = localStorage.getItem("id");
    const API_URL = process.env.REACT_APP_API_URL;
    const headers = authHeader(getCurrentStore());

    const getStoreDetails = async () => {
      try {
        await axios
          .get(`${API_URL}store/stores/${storeId}`, {
            headers,
          })
          .then((response) => {
            dispatch(setStore(response.data));
          });
      } catch (error) {
        console.log(error);
      }
    };

    const getStoreProducts = async () => {
      try {
        await axios
          .get(`${API_URL}stores/${storeId}/products`, {
            headers,
          })
          .then((response) => {
            dispatch(setAllStoreProducts(response.data));
          });
      } catch (error) {
        console.log(error);
      }
    };
    getStoreDetails();
    getStoreProducts();
  }, [dispatch]);

  useEffect(() => {
    const storeId = localStorage.getItem("id");
    dispatch(getStoreOrders(storeId));
  }, [dispatch]);

  return (
    <>
      {isEditStoreOpen && <EditStoreModal checkLoader={checkLoader} />}
      {isNewProductOpen && <NewProductFormModal checkLoader={checkLoader} />}
      {isConfirmDeleteOpen && <ConfirmDeleteModal checkLoader={checkLoader} />}
      {isEditImagesOpen && <EditProductImages checkLoader={checkLoader} />}
      {isDeleteStoreOpen && <ConfirmStoreDelete checkLoader={checkLoader} />}
      <div
        className="ui inverted vertical masthead center aligned segment"
        style={{
          backgroundImage: `url(${store?.store.current_store.data.attributes.logo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
              Welcome, {store?.store.current_store.data.attributes.name}
            </h1>
            <h3
              style={{
                fontFamily: "monospace",
                fontSize: "35px",
                textShadow: "2px 2px black",
                fontWeight: "bold",
                WebkitTextStroke: "1px black",
                backgroundColor: "rgba(33, 31, 31, 0.6)", // Adjust the alpha (fourth value) for transparency
                padding: "15px",
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
