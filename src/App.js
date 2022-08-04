import React, { useState } from "react";
// import { Counter } from './features/counter/Counter';
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
} from "./features/auth/customerSlice";

import Navbar from "./components/nav/Navbar";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentStore, setCurrentStore] = useState(undefined);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.loader);
  const { logo } = useSelector((store) => store.store);

  const checkLoader = () => {
    dispatch(activateLoader());
    setTimeout(() => {
      dispatch(deactivateLoader());
    }, 1000);
  };

  useEffect(() => {
    const user = getCurrentUser();
    console.log(user);
    if (user) {
      setCurrentUser(user);
      dispatch(isCustomerLoggedInChanger());
      dispatch(setCustomerId(JSON.parse(localStorage.getItem("id"))));
    }
  }, []);

  useEffect(() => {
    const store = getCurrentStore();
    console.log(store);
    if (store) {
      setCurrentStore(store);
      dispatch(isStoreLoggedInChanger());
      dispatch(setStoreId(JSON.parse(localStorage.getItem("id"))));
    }
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  // console.log(logo)

  return (
    <div className="App">
      <nav>
        <Navbar />
        {isLoading ? <Loader /> : null}
      </nav>
      <Routes>
        <Route path="/" element={<StaticPages />} />
        <Route path="/login" element={<Login checkLoader={checkLoader} />} />
        <Route
          path="/store/login"
          element={<StoreLogin checkLoader={checkLoader} />}
        />
        <Route path="/signup" element={<SignUp checkLoader={checkLoader} />} />
        <Route
          path="/store/signup"
          element={<RegisterStore checkLoader={checkLoader} />}
        />

        <Route
          exact
          path="/"
          element={currentUser ? <Home /> : <Login checkLoader={checkLoader} />}
        />

        <Route
          exact
          path="/dashboard"
          element={
            currentStore ? (
              <Dashboard />
            ) : (
              <StoreLogin checkLoader={checkLoader} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
