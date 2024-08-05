import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import StaticPages from "./components/static_pages/StaticPages";
import Login from "./components/authentication/Login";
import StoreLogin from "./components/authentication/StoreLogin";
import SignUp from "./components/authentication/SignUp";
import RegisterStore from "./components/authentication/RegisterStore";
import Loader from "./components/static_pages/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  activateLoader,
  deactivateLoader,
} from "./features/loader/loaderSlice";

import Home from "./components/index/customer/home/Home";
import { useEffect } from "react";
import {
  getCurrentStore,
  getCurrentUser,
} from "./app/services/auth-services/auth-service";
import {
  getCategories,
  isStoreLoggedInChanger,
  setStoreId,
} from "./features/auth/storeSlice";
import Dashboard from "./components/index/store/Dashboard";
import {
  isCustomerLoggedInChanger,
  setCustomerId,
  getAllCustomers,
} from "./features/auth/customerSlice";

import Navbar from "./components/nav/Navbar";
import { getProductsImages, getReviews } from "./features/static/staticSlice";
import StoreDetails from "./components/index/customer/home/StoreDetails";
import ProductView from "./components/index/customer/home/ProductView";
import CartContainer from "./components/index/customer/cart/CartContainer";
import AllOrders from "./components/index/customer/cart/AllOrders";
import ThankYou from "./components/index/customer/cart/ThankYou";
import ViewOrdersContainer from "./components/index/store/ViewOrdersContainer";
import ResetUserEmail from "./components/authentication/ResetUserEmail";
import ResetUserPasswordForm from "./components/authentication/ResetUserPasswordForm";
import ResetStoreEmail from "./components/authentication/ResetStoreEmail";
import ResetStorePasswordForm from "./components/authentication/ResetStorePasswordForm";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentStore, setCurrentStore] = useState(undefined);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.loader);
  const { isHomeLoading } = useSelector((store) => store.home);
  const { isCustomerLoggedIn } = useSelector((store) => store.customer);
  const { isStoreLoggedIn } = useSelector((store) => store.store);

  const checkLoader = (time) => {
    dispatch(activateLoader());
    setTimeout(() => {
      dispatch(deactivateLoader());
    }, time);
  };

  // window.onbeforeunload = function () {
  //   return "Data will be lost if you leave the page, are you sure?";
  // };

  useEffect(() => {
    dispatch(getProductsImages());
    dispatch(getReviews());
  }, [dispatch]);

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
      console.log("Local storage cleared.");
    };

    // Add event listener for beforeunload event
    window.addEventListener("beforeunload", clearLocalStorage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      dispatch(isCustomerLoggedInChanger());
      dispatch(setCustomerId(JSON.parse(localStorage.getItem("id"))));
    }
  }, [isCustomerLoggedIn, dispatch]);

  useEffect(() => {
    const store = getCurrentStore();
    if (store) {
      setCurrentStore(store);
      dispatch(isStoreLoggedInChanger());
      dispatch(setStoreId(JSON.parse(localStorage.getItem("id"))));
    }
  }, [isStoreLoggedIn, dispatch]);

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getCategories());
  }, [dispatch]);

  const notAuthorized = () => {
    return (
      <div className="ui container" style={{ textAlign: "center" }}>
        <br />
        <br />
        <h2>Not Authorized To View Page</h2>
        <br />
        <br />
        <button className="ui primary button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="App">
        {currentUser && currentStore ? null : (
          <Navbar checkLoader={checkLoader} />
        )}
        {isLoading || isHomeLoading ? <Loader /> : null}

        <Routes>
          {/* <Route path="/with-love" element={<StaticPages />} /> */}
          <Route
            exact
            path="/"
            element={
              currentStore ? (
                <Dashboard checkLoader={checkLoader} />
              ) : currentUser ? (
                <Home checkLoader={checkLoader} />
              ) : (
                // : JSON.parse(localStorage.getItem("signup_error")) ? (
                //   <SignUp checkLoader={checkLoader} />
                // ) : JSON.parse(localStorage.getItem("store_signup_error")) ? (
                //   <RegisterStore checkLoader={checkLoader} />
                // ) : JSON.parse(localStorage.getItem("store_login_error")) ? (
                //   <StoreLogin checkLoader={checkLoader} />
                // ) : JSON.parse(localStorage.getItem("login_error")) ? (
                //   <Login checkLoader={checkLoader} />
                // )
                <StaticPages />
                // <Login checkLoader={checkLoader} />
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate replace to="/" />
              ) : (
                <Login checkLoader={checkLoader} />
              )
            }
          />
          <Route
            path="/store/login"
            element={
              currentStore ? (
                <Navigate replace to="/" />
              ) : (
                <StoreLogin checkLoader={checkLoader} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? (
                <Navigate replace to="/" />
              ) : (
                <SignUp checkLoader={checkLoader} />
              )
            }
          />
          <Route
            path="/store/signup"
            element={
              currentStore ? (
                <Navigate replace to="/" />
              ) : (
                <RegisterStore checkLoader={checkLoader} />
              )
            }
          />
          <Route
            path="/stores/:id"
            element={
              currentUser ? (
                <StoreDetails checkLoader={checkLoader} />
              ) : (
                <Login checkLoader={checkLoader} />
              )
            }
          />
          <Route
            path="/products/:id"
            element={
              currentUser ? (
                <ProductView checkLoader={checkLoader} />
              ) : (
                <Login checkLoader={checkLoader} />
              )
            }
          />
          <Route
            path="/cart"
            element={
              currentUser ? (
                <CartContainer checkLoader={checkLoader} />
              ) : (
                notAuthorized()
              )
            }
          />
          <Route
            path="/thank-you"
            element={
              currentUser ? (
                <ThankYou checkLoader={checkLoader} />
              ) : (
                notAuthorized()
              )
            }
          />
          <Route
            path="/stores/:id/orders"
            element={
              currentStore ? (
                <ViewOrdersContainer checkLoader={checkLoader} />
              ) : (
                notAuthorized()
              )
            }
          />
          <Route
            path="/users/:id/orders"
            element={
              currentUser ? (
                <AllOrders checkLoader={checkLoader} />
              ) : (
                notAuthorized()
              )
            }
          />
          <Route
            path="/reset_user"
            element={<ResetUserEmail checkLoader={checkLoader} />}
          />
          <Route
            path="/reset_user_password"
            element={<ResetUserPasswordForm checkLoader={checkLoader} />}
          />
          <Route
            path="/reset_store"
            element={<ResetStoreEmail checkLoader={checkLoader} />}
          />
          <Route
            path="/reset_store_password"
            element={<ResetStorePasswordForm checkLoader={checkLoader} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
