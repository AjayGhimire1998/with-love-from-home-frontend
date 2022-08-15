import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate, Link } from "react-router-dom";
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
  getAllCustomers
} from "./features/auth/customerSlice";

import Navbar from "./components/nav/Navbar";
import { getProductsImages } from "./features/static/staticSlice";
import StoreDetails from "./components/index/customer/home/StoreDetails";
import ProductView from "./components/index/customer/home/ProductView";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentStore, setCurrentStore] = useState(undefined);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.loader);
  const { isHomeLoading } = useSelector((store) => store.home);

  const checkLoader = (time) => {
    dispatch(activateLoader());
    setTimeout(() => {
      dispatch(deactivateLoader());
    }, time);
  };

  useEffect(() => {
    dispatch(getProductsImages());
  }, []);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      dispatch(isCustomerLoggedInChanger());
      dispatch(setCustomerId(JSON.parse(localStorage.getItem("id"))));
    }
  }, []);

  useEffect(() => {
    const store = getCurrentStore();
    if (store) {
      setCurrentStore(store);
      dispatch(isStoreLoggedInChanger());
      dispatch(setStoreId(JSON.parse(localStorage.getItem("id"))));
    }
  }, []);

  useEffect(() => {
    dispatch(getCategories());

  }, []);
  useEffect(() => {
    dispatch(getAllCustomers())
  }, [])

  return (
    <>
      <div className="App">
        {currentUser && currentStore ? null : <Navbar />}
        {isLoading || isHomeLoading ? <Loader /> : null}

        <Routes>
          <Route path="/with-love-from-home" element={<StaticPages />} />
          <Route
            exact
            path="/"
            element={
              currentStore ? (
                <Dashboard checkLoader={checkLoader} />
              ) : currentUser ? (
                <Home checkLoader={checkLoader} />
              ) : (
                <Login checkLoader={checkLoader} />
              )
              // currentStore && currentUser ? (
              //   <Login checkLoader={checkLoader} />
              // ) : (
              //   <StaticPages checkLoader={checkLoader} />
              // )
            }
          />
          <Route path="/login" element={<Login checkLoader={checkLoader} />} />
          <Route
            path="/store/login"
            element={<StoreLogin checkLoader={checkLoader} />}
          />
          <Route
            path="/signup"
            element={<SignUp checkLoader={checkLoader} />}
          />
          <Route
            path="/store/signup"
            element={<RegisterStore checkLoader={checkLoader} />}
          />
          <Route
            path="/stores/:id"
            element={currentUser ? <StoreDetails checkLoader={checkLoader} /> : <h2>401 | Please Login to View Page</h2>}
          />
          <Route
            path="/products/:id"
            element={currentUser ? <ProductView checkLoader={checkLoader} /> :<h2>401 | Please Login to View Page</h2>}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
