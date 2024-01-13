import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import navbarReducer from "../features/navbar/navbarSlice";
import loaderReducer from "../features/loader/loaderSlice";
import customerReducer from "../features/auth/customerSlice";
import storeReducer from "../features/auth/storeSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import modalReducer from "../features/dashboard/modalSlice";
import productReducer from "../features/dashboard/productSlice";
import staticReducer from "../features/static/staticSlice";
import homeReducer from "../features/home/homeSlice";
import ratingReducer from "../features/home/ratingSlice";
import homeproductReducer from "../features/home/homeproductSlice";
import cartFormReducer from "../features/cart/cartFormSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    navbar: navbarReducer,
    loader: loaderReducer,
    customer: customerReducer,
    store: storeReducer,
    dashboard: dashboardReducer,
    modal: modalReducer,
    product: productReducer,
    static: staticReducer,
    home: homeReducer,
    rating: ratingReducer,
    homeproduct: homeproductReducer,
    cartForm: cartFormReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
