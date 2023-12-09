import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderDetails } from "../utils/api";

export const getOrderData = createAsyncThunk("getOrderData", async (data) => {
  const response = getOrderDetails(data);
  return response;
});

const orderDataSlice = createSlice({
  name: "orderData",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.order = null;
      })
      .addCase(getOrderData.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      });
  },
});

export default orderDataSlice.reducer;
