import { configureStore } from "@reduxjs/toolkit";
import cansatReducer from "./slices/cansatDataSlice";

export default configureStore({
  reducer: { cansat: cansatReducer },
});
