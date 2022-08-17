import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditStoreOpen: false,
  isNewProductOpen: false,
  isEditProductOpen: false,
  isConfirmDeleteOpen: false,
  isEditImagesOpen: false,
  isViewOrderOpen: false,
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
      state.isViewOrderOpen = false;
    },
    closeEditStoreModal: (state, action) => {
      state.isEditStoreOpen = false;
      state.isNewProductOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
    },
    openNewProductModal: (state, action) => {
      state.isNewProductOpen = true;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
    },
    closeNewProductModal: (state, action) => {
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
    },
    openEditProductModal: (state) => {
      state.isEditProductOpen = true;
      state.isConfirmDeleteOpen = false;
      state.isEditStoreOpen = false;
      state.isNewProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
    },
    closeEditProductModal: (state) => {
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
    },
    openEditImagesModal: (state) => {
      state.isEditImagesOpen = true;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isViewOrderOpen = false;
    },
    closeEditImageModal: (state) => {
      state.isEditImagesOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isViewOrderOpen = false;
    },
    openConfirmDeleteModal: (state) => {
      state.isConfirmDeleteOpen = true;
      state.isEditProductOpen = false;
      state.isEditStoreOpen = false;
      state.isNewProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
    },
    closeConfirmDeleteModal: (state) => {
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
    },
    openViewOrder: (state) => {
      state.isViewOrderOpen = true;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
    },
    closeViewOrder: (state) => {
      state.isViewOrderOpen = false;
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
  openViewOrder,
  closeViewOrder
  // forceRender
} = modalSlice.actions;

export default modalSlice.reducer;
