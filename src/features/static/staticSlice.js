import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getProductsImages = createAsyncThunk(
  "static/getProductsImages",
  async (name, thunkAPI) => {
    try {
      const response = await axios(`${API_URL}product/products`);
      return response.data.products.map((product) => product.images);
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
export const getReviews = createAsyncThunk(
  "static/getReviews",
  async (name, thunkAPI) => {
    try {
      const response = await axios(`${API_URL}review/store_reviews`);
      return response.data
        .filter((review) => review.content !== "")
        .slice(0, 9, 1);
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
const initialState = {
  isDataReady: false,
  staticImages: null,
  staticReviews: null,
};

const staticSlice = createSlice({
  name: "static",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductsImages.pending]: (state) => {
      state.staticImages = initialState.staticImages;
    },
    [getProductsImages.fulfilled]: (state, action) => {
      // console.log("Action payload:", action.payload)
      state.staticImages = action.payload;
      if (state.staticImages.length > 0) {
        state.isDataReady = true;
      }
    },
    [getReviews.fulfilled]: (state, action) => {
      state.staticReviews = action.payload;
    },
  },
});

export default staticSlice.reducer;
