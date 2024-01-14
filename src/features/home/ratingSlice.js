import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getStoreReviews = createAsyncThunk(
  "rating/getStorereviews",
  async (id, thunkAPI) => {
    try {
      const response = await axios(
        `${API_URL}stores/${id}/reviews`
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
        `${API_URL}products/${id}/reviews`
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
  isReviewEditOpen: false,
  recentlyUpdatedReview: [],
  successfulMessage: null,
  errorMessage: null,
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.rating = action.payload;
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
    setIsReviewEditOpenToTrue: (state) => {
      state.isReviewEditOpen = true;
    },
    setIsReviewEditOpenToFalse: (state) => {
      state.isReviewEditOpen = false;
    },
    setRecentlyUpdatedReview: (state, action) => {
      state.recentlyUpdatedReview = action.payload;
    },
    replaceRecentlyUpdatedReview: (state) => {
      state.productReviews = state.productReviews
        .flat(Infinity)
        .map((review) =>
          review.id !== state.recentlyUpdatedReview.id
            ? review
            : state.recentlyUpdatedReview
        );
      state.rating = 0;
      state.reviewContent = "";
    },
    eraseDeletedReview: (state, action) => {
      state.productReviews = state.productReviews
        .flat(Infinity)
        .filter((review) => review.id !== action.payload);
    },
    replaceRecentlyUpdatedStoreReview: (state) => {
      state.storeReviews = state.storeReviews
        .flat(Infinity)
        .map((review) =>
          review.id !== state.recentlyUpdatedReview.id
            ? review
            : state.recentlyUpdatedReview
        );
      state.rating = 0;
      state.reviewContent = "";
    },
    eraseDeletedStoreReview: (state, action) => {
      state.storeReviews = state.storeReviews
        .flat(Infinity)
        .filter((review) => review.id !== action.payload);
    },
    setSuccessfulMessage: (state, action) => {
      state.successfulMessage = null;
      state.successfulMessage = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = null;
      state.errorMessage = action.payload;
    },
    clearMessages: (state) => {
      state.successfulMessage = null;
      state.errorMessage = null;
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
  setReviewContent,
  setNewStoreReview,
  setNewProductReview,
  setIsReviewEditOpenToTrue,
  setIsReviewEditOpenToFalse,
  setRecentlyUpdatedReview,
  replaceRecentlyUpdatedReview,
  eraseDeletedReview,
  replaceRecentlyUpdatedStoreReview,
  eraseDeletedStoreReview,
  setSuccessfulMessage,
  setErrorMessage,
  clearMessages
} = ratingSlice.actions;
export default ratingSlice.reducer;
