import { configureStore } from "@reduxjs/toolkit";
import ingredientsDataSlice from "./ingredientsDataSlice";
import modalDataSlice from "./modalDataSlice";
import burgerDataSlice from "./burgerDataSlice";
import orderDataSlice from "./orderDataSlice";

export default configureStore({
  reducer: {
    ingredientsData: ingredientsDataSlice,
    burgerData: burgerDataSlice,
    modalData: modalDataSlice,
    orderData: orderDataSlice,
  },
});
