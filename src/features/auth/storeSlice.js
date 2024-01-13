import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "store/getCategories",
  async (name, thunkAPI) => {
    try {
      const response = await axios("http://localhost:304/api/v1/categories");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  categoryItems: [],
  name: "",
  logo: null,
  categoryId: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  isStoreLoggedIn: false,
  storeId: null,
  error: null,
  tokken: "",
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    nameChanger: (state, action) => {
      state.name = action.payload;
    },
    logoChanger: (state, action) => {
      state.logo = action.payload;
    },
    categoryIdChanger: (state, action) => {
      state.categoryId = action.payload;
    },
    emailChanger: (state, action) => {
      state.email = action.payload;
    },
    passwordChanger: (state, action) => {
      state.password = action.payload;
    },
    passwordConfirmationChanger: (state, action) => {
      state.passwordConfirmation = action.payload;
    },
    isStoreLoggedInChanger: (state) => {
      state.isStoreLoggedIn = true;
    },
    isStoreLoggedInChangerToFalse: (state) => {
      state.isStoreLoggedIn = false;
    },
    setStoreId: (state, action) => {
      state.storeId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTokken: (state, action) => {
      state.tokken = action.payload
    },
    clearStoreError: (state) => {
      state.error = ""
    }
  },
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categoryItems = action.payload;
    },
  },
});

export const {
  nameChanger,
  logoChanger,
  categoryIdChanger,
  emailChanger,
  passwordChanger,
  passwordConfirmationChanger,
  isStoreLoggedInChanger,
  setStoreId,
  isStoreLoggedInChangerToFalse,
  setError,
  setTokken,
  clearStoreError
} = storeSlice.actions;

export default storeSlice.reducer;
