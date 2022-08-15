import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStoreReviews = createAsyncThunk(
  "rating/getStorereviews",
  async (id, thunkAPI) => {
    try {
      const response = await axios(
        `http://localhost:3001/api/v1/stores/${id}/reviews`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const getSelectedProductReviews = createAsyncThunk(
  "homeproduct/getSelectedProductReviews",
  async (id, thunkAPI) => {
    try {
      const response = await axios(
        `http://localhost:3001/api/v1/products/${id}/reviews`
      );
      // console.log(response.data)
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  rating: 0,
  storeReviews: null,
  reviewContent: "",
  newStoreReview: null,
  productReviews: null,
  newProductReview: null,
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setStoreReviews: (state, action) => {
      state.storeReviews = action.payload;
    },
    setReviewContent: (state, action) => {
      state.reviewContent = action.payload;
    },
    setNewStoreReview: (state, action) => {
      state.newStoreReview = action.payload;
      state.storeReviews.unshift(state.newStoreReview);
      state.rating = 0;
      state.reviewContent = "";
    },
    setNewProductReview: (state, action) => {
      state.newProductReview = action.payload;
      state.productReviews.unshift(state.newProductReview);
      state.rating = 0;
      state.reviewContent = "";
    },
  },
  extraReducers: {
    [getStoreReviews.fulfilled]: (state, action) => {
      state.storeReviews = action.payload;
    },
    [getSelectedProductReviews.fulfilled]: (state, action) => {
      state.productReviews = action.payload;
    },
  },
});
export const {
  setRating,
  setStoreReviews,
  setReviewContent,
  setNewStoreReview,
  setNewProductReview,
} = ratingSlice.actions;
export default ratingSlice.reducer;
