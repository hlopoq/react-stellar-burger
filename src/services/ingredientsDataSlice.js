import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataIngredients } from "../utils/api";

export const getIngredients = createAsyncThunk(
  "getIngredients",
  async (thunkAPI) => {
    try {
      const response = await getDataIngredients();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ingredientsDataSlice = createSlice({
  name: "ingredientsData",
  initialState: {
    ingredients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.ingredients = [];
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload.data;
      });
  },
});

export default ingredientsDataSlice.reducer;
