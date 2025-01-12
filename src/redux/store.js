import { configureStore } from "@reduxjs/toolkit";
import reportsReducer from "./slices/crudSlices";

const store = configureStore({
  reducer: {
    reports: reportsReducer,
  },
});

export default store;
