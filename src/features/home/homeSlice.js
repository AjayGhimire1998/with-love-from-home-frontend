import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { activateLoader } from "../loader/loaderSlice";

export const getAllStores = createAsyncThunk(
  "home/getAllStores",
  async (name, thunkAPI) => {
    try {
      const response = await axios("http://localhost:3001/api/v1/stores");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "home/getAllProducts",
  async (name, thunkAPI) => {
    try {
      const response = await axios("http://localhost:3001/api/v1/products");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);

export const setSelectedStore = createAsyncThunk(
  "home/setSelectedStore",
  async (storeId, thunkAPI) => {
    try {
      const response = await axios(
        `http://localhost:3001/api/v1/stores/${storeId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const setSelectedStoreProducts = createAsyncThunk(
  "home/setSelectedStoreProducts",
  async (storeId, thunkAPI) => {
    try {
      const response = await axios(
        `http://localhost:3001/api/v1/stores/${storeId}/products`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  categoryId: null,
  allStores: [],
  allProducts: [],
  filteredProducts: null,
  filteredStores: null,
  searchedProducts: [],
  isHomeLoading: false,
  isDimmerOnHover: false,
  pageCounter: 0,
  selectedStore: null,
  hoveredStore: [],
  selectedStoreProducts: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setIsDimmerOnHover: (state, action) => {
      state.isDimmerOnHover = action.payload;
    },
    increasePageCounter: (state) => {
      state.pageCounter = state.pageCounter + 6;
    },
    decreasePageCounter: (state) => {
      state.pageCounter = state.pageCounter - 6;
    },
    setHoveredStore: (state, action) => {
      const hoveredStore = state.allStores.find(
        (store) => store.id === action.payload
      );
      state.hoveredStore = hoveredStore;
    },
    eraseSelectedStore: (state) => {
      state.selectedStore = [];
    },
    setFilteredProducts: (state) => {
      const filteredStores = state.allStores.filter(
        (store) => store.category_id === state.categoryId
      );
      state.filteredStores = filteredStores.flat(Infinity);

      const filteredProducts = filteredStores?.map((store) => {
        return state.allProducts.products?.filter((product) => {
          if (product.store_id === store.id) {
            return product;
          }
        });
      });
      state.filteredProducts = filteredProducts
        .flat(Infinity)
        .filter((p) => p !== undefined);
      
      
    },
  },
  extraReducers: {
    [getAllStores.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [getAllStores.fulfilled]: (state, action) => {
      state.allStores = action.payload;
      state.isHomeLoading = false;
    },
    [getAllProducts.pending]: (state) => {
      state.isHomeLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.allProducts = action.payload;
      state.isHomeLoading = false;
    },
    [setSelectedStore.pending]: (state) => {
      state.isHomeLoading = true;
    },
    [setSelectedStore.fulfilled]: (state, action) => {
      state.selectedStore = action.payload;
      state.isHomeLoading = false;
    },
    [setSelectedStore.rejected]: (state, action) => {
      state.isHomeLoading = false;
      console.log(action);
    },
    [setSelectedStoreProducts.pending]: (state) => {
      state.isHomeLoading = true;
    },
    [setSelectedStoreProducts.fulfilled]: (state, action) => {
      state.selectedStoreProducts = action.payload;
      state.isHomeLoading = false;
    },
  },
});

export const {
  setCategoryId,
  setIsDimmerOnHover,
  increasePageCounter,
  decreasePageCounter,
  setHoveredStore,
  eraseSelectedStore,
  setFilteredProducts,
} = homeSlice.actions;
export default homeSlice.reducer;
