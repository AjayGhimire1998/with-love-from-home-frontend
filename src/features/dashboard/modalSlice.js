import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditStoreOpen: false,
  isNewProductOpen: false,
  isEditProductOpen: false,
  isConfirmDeleteOpen: false,
  isEditImagesOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openEditStoreModal: (state, action) => {
      state.isEditStoreOpen = true;
      state.isNewProductOpen = false;
      state.isEditProductOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditImagesOpen = false;
    },
    closeEditStoreModal: (state, action) => {
      state.isEditStoreOpen = false;
      state.isNewProductOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isEditImagesOpen = false;
    },
    openNewProductModal: (state, action) => {
      state.isNewProductOpen = true;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isEditImagesOpen = false;
    },
    closeNewProductModal: (state, action) => {
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isEditImagesOpen = false;
    },
    openEditProductModal: (state) => {
      state.isEditProductOpen = true;
      state.isConfirmDeleteOpen = false;
      state.isEditStoreOpen = false;
      state.isNewProductOpen = false;
      state.isEditImagesOpen = false;
    },
    closeEditProductModal: (state) => {
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditImagesOpen = false;
    },
    openEditImagesModal: (state) => {
      state.isEditImagesOpen = true;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
    },
    closeEditImageModal: (state) => {
      state.isEditImagesOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
    },
    openConfirmDeleteModal: (state) => {
      state.isConfirmDeleteOpen = true;
      state.isEditProductOpen = false;
      state.isEditStoreOpen = false;
      state.isNewProductOpen = false;
      state.isEditImagesOpen = false;
    },
    closeConfirmDeleteModal: (state) => {
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
    },
  },
});

export const {
  openEditStoreModal,
  closeEditStoreModal,
  openNewProductModal,
  closeNewProductModal,
  openEditProductModal,
  closeEditProductModal,
  openEditImagesModal,
  closeEditImageModal,
  openConfirmDeleteModal,
  closeConfirmDeleteModal,
  // forceRender
} = modalSlice.actions;

export default modalSlice.reducer;
