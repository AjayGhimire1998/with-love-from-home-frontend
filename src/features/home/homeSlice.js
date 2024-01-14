import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllStores = createAsyncThunk(
  "home/getAllStores",
  async (name, thunkAPI) => {
    try {
      const response = await axios(`${API_URL}store/stores`);
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
      const response = await axios(`${API_URL}product/products`);
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
        `${API_URL}store/stores/${storeId}`
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
        `${API_URL}stores/${storeId}/products`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "cart/getUserOrders",
  async (id, thunkAPI) => {
    try {
      const response = await axios(
        `${API_URL}customers/${id}/orders`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);

const initialState = {
  categoryId: null,
  allStores: [],
  allProducts: [],
  filteredProducts: null,
  filteredStores: null,
  searchQuery: "",
  searchedProducts: [],
  searchedStores: [],
  isSearchLoading: false,
  isHomeLoading: false,
  isDimmerOnHover: false,
  pageCounter: 0,
  filteredPageCounter: 0,
  selectedStore: [],
  hoveredStore: [],
  selectedStoreProducts: [],
  userOrders: [],
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
    increaseFilteredPageCounter: (state) => {
      state.filteredPageCounter = state.filteredPageCounter + 6;
    },
    decreaseFilteredPageCounter: (state) => {
      state.filteredPageCounter = state.filteredPageCounter - 6;
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
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
      state.isSearchLoading = true;
      state.searchedProducts = state.allProducts.products.filter((product) => {
        if (
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        ) {
          return product;
        }
      });

      state.searchedStores = state.allStores.filter((store) => {
        if (
          store.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        ) {
          return store;
        }
      });

      if (state.searchQuery === "") {
        state.searchedProducts = [];
        state.searchedStores = [];
        state.isSearchLoading = false;
      }
    },
    clearSearch: (state) => {
      state.searchedProducts = [];
      state.searchedStores = [];
      state.isSearchLoading = false;
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
    [getUserOrders.pending]: (state) => {
      state.isHomeLoading = true;
    },
    [getUserOrders.fulfilled]: (state, action) => {
      state.userOrders = action.payload;
      state.isHomeLoadingß = false;
    },
    [getUserOrders.rejected]: (state) => {
      state.isHomeLoadingß = false;

    },
  },
});

export const {
  setCategoryId,
  setIsDimmerOnHover,
  increasePageCounter,
  decreasePageCounter,
  increaseFilteredPageCounter,
  decreaseFilteredPageCounter,
  setHoveredStore,
  eraseSelectedStore,
  setFilteredProducts,
  setSearch,
  clearSearch,
} = homeSlice.actions;
export default homeSlice.reducer;
