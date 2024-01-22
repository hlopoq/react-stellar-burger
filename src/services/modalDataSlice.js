import { createSlice } from "@reduxjs/toolkit";

const modalDataSlice = createSlice({
  name: "modalData",
  initialState: {
    active: false,
    type: "",
    details: null,
  },
  reducers: {
    openModal(state, action) {
      state.active = true;
      state.type = action.payload.type;
      state.details = action.payload.details;
    },
    closeModal(state) {
      state.active = false;
      state.type = "";
      state.details = null;
    },
  },
});

export const { openModal, closeModal } = modalDataSlice.actions;

export default modalDataSlice.reducer;
