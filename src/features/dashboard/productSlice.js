import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  price: "",
  // isAvailable: null,
  inStock: null,
  productImages: [],
  eachImage: "",
  newProduct: [],
  recentlyUpdatedProduct: [],
  allStoreProducts: [],
  id: null,
  
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setInStock: (state, action) => {
      state.inStock = action.payload
    },
    pushToProductImages: (state, action) => {
      state.productImages = action.payload;
    },
    getEachImage: (state, action) => {
      state.eachImage = action.payload;
    },
    setNewProduct: (state, action) => {
      state.newProduct = action.payload;
    },
    unshiftNewProduct: (state) => {
      state.allStoreProducts.unshift(state.newProduct);
    },
    clearForm: (state) => {
      state.name = "";
      state.description = "";
      state.price = "";
      state.productImages = [];
      state.eachImage = "";
    },
    setAllStoreProducts: (state, action) => {
      state.allStoreProducts = action.payload || [];
    },
    setEditProduct: (state, action) => {
      const productItem = state.allStoreProducts.find(
        (product) => product.id === action.payload
      );
      state.id = productItem.id;
      state.name = productItem.name;
      state.description = productItem.description;
      state.price = productItem.price;
    
    },
    setEditProductImages: (state, action) => {
      const productItem = state.allStoreProducts.find(
        (product) => product.id === action.payload
      );
      state.id = productItem.id;
      state.name = productItem.name
    },
    setRecentlyUpdatedProduct: (state, action) => {
      state.recentlyUpdatedProduct = action.payload;
    },
    replaceRecentlyUpdatedProduct: (state) => {
      state.allStoreProducts = state.allStoreProducts.map((product) =>
        product.id !== state.recentlyUpdatedProduct.id
          ? product
          : state.recentlyUpdatedProduct
      );
    },
    setDeleteProduct: (state, action) => {
      const productItemToDelete = state.allStoreProducts.find(
        (product) => product.id === action.payload
      );
      state.id = productItemToDelete.id;
      state.name = productItemToDelete.name;
    },
    eraseDeletedProduct: (state) => {
      state.allStoreProducts = state.allStoreProducts.filter(
        (product) => product.id !== state.id
      );
    },
    clearBlankImages: (state) => {
      state.productImages = [];
      state.eachImage = "";
    },
  },
});

export const {
  setName,
  setDescription,
  setPrice,
  setInStock,
  pushToProductImages,
  getEachImage,
  setNewProduct,
  setEditProductImages,
  unshiftNewProduct,
  clearForm,
  setAllStoreProducts,
  setRecentlyUpdatedProduct,
  replaceRecentlyUpdatedProduct,
  setEditProduct,
  setDeleteProduct,
  eraseDeletedProduct,
  clearBlankImages,
} = productSlice.actions;

export default productSlice.reducer;
