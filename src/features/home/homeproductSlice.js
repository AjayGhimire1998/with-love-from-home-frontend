import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSelectedProduct = createAsyncThunk(
  "homeproduct/getSelectedProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axios(
        `http://localhost:3001/api/v1/products/${id}`
      );
      // console.log(response.data)
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  selectedProduct: null,
  isProductLoading: false,
  imagePreviewIndex: 0,
};

const homeproductSlice = createSlice({
  name: "homeproduct",
  initialState,
  reducers: {
    setImagePreviewIndex: (state, action) => {
      state.imagePreviewIndex = action.payload;
    },
  },
  extraReducers: {
    [getSelectedProduct.pending]: (state) => {
      state.isProductLoading = true;
    },
    [getSelectedProduct.fulfilled]: (state, action) => {
      state.selectedProduct = action.payload;
      state.isProductLoading = false;
    },
    [getSelectedProduct.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
  },
});
export const { setImagePreviewIndex } = homeproductSlice.actions;
export default homeproductSlice.reducer;
