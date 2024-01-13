import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditStoreOpen: false,
  isNewProductOpen: false,
  isEditProductOpen: false,
  isConfirmDeleteOpen: false,
  isEditImagesOpen: false,
  isViewOrderOpen: false,
  isApproveMessageBoxOpen: false,
  isRejectMessageBoxOpen: false,
  isDeleteStoreOpen: false,
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
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    closeEditStoreModal: (state, action) => {
      state.isEditStoreOpen = false;
      state.isNewProductOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    openNewProductModal: (state, action) => {
      state.isNewProductOpen = true;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    closeNewProductModal: (state, action) => {
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    openEditProductModal: (state) => {
      state.isEditProductOpen = true;
      state.isConfirmDeleteOpen = false;
      state.isEditStoreOpen = false;
      state.isNewProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    closeEditProductModal: (state) => {
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    openEditImagesModal: (state) => {
      state.isEditImagesOpen = true;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isViewOrderOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    closeEditImageModal: (state) => {
      state.isEditImagesOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isViewOrderOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    openConfirmDeleteModal: (state) => {
      state.isConfirmDeleteOpen = true;
      state.isEditProductOpen = false;
      state.isEditStoreOpen = false;
      state.isNewProductOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    closeConfirmDeleteModal: (state) => {
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
      state.isViewOrderOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    openViewOrder: (state) => {
      state.isViewOrderOpen = true;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    closeViewOrder: (state) => {
      state.isViewOrderOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    openApproveMesssageBox: (state) => {
      state.isApproveMessageBoxOpen = true;
      state.isViewOrderOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    closeApproveMessageBox: (state) => {
      state.isApproveMessageBoxOpen = false;
      state.isViewOrderOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isDeleteStoreOpen = false;
    },
    openRejectMessageBox: (state) => {
      state.isRejectMessageBoxOpen = true;
      state.isApproveMessageBoxOpen = false;
      state.isViewOrderOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
      state.isDeleteStoreOpen = false;
    },
    closeRejectMessageBox: (state) => {
      state.isRejectMessageBoxOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isViewOrderOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
      state.isDeleteStoreOpen = false;
    },
    openConfirmDeleteStore: (state) => {
      state.isDeleteStoreOpen = true;
      state.isRejectMessageBoxOpen = false;
      state.isApproveMessageBoxOpen = false;
      state.isViewOrderOpen = false;
      state.isConfirmDeleteOpen = false;
      state.isEditProductOpen = false;
      state.isNewProductOpen = false;
      state.isEditStoreOpen = false;
      state.isEditImagesOpen = false;
    },
    closeConfirmDeleteStore: (state) => {
      state.isDeleteStoreOpen = false;
      state.isRejectMessageBoxOpen = false;
      state.isApproveMessageBoxOpen = false;
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
  closeViewOrder,
  openApproveMesssageBox,
  closeApproveMessageBox,
  openRejectMessageBox,
  closeRejectMessageBox,
  openConfirmDeleteStore,
  closeConfirmDeleteStore,
} = modalSlice.actions;

export default modalSlice.reducer;
