import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = createAsyncThunk(
  "store/getCategories",
  async (name, thunkAPI) => {
    try {
      const response = await axios(`${API_URL}category/categories`);
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
  success: null,
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
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setTokken: (state, action) => {
      state.tokken = action.payload
    },
    clearStoreError: (state) => {
      localStorage.removeItem("store_signup_error")
      localStorage.removeItem("store_login_error")
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
  setSuccess,
  setTokken,
  clearStoreError
} = storeSlice.actions;

export default storeSlice.reducer;
