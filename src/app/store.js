import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import navbarReducer from "../features/navbar/navbarSlice";
import loaderReducer from "../features/loader/loaderSlice";
import customerReducer from "../features/auth/customerSlice";
import storeReducer from "../features/auth/storeSlice"
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    navbar: navbarReducer,
    loader: loaderReducer,
    customer: customerReducer,
    store: storeReducer,
    dashboard: dashboardReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
