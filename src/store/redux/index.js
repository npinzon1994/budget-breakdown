import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading-slice";
import sendingReducer from "./sending-slice";
import showHideReducer from "./show-hide-slice";
import filterReducer from './filter-slice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    sending: sendingReducer,
    showHide: showHideReducer,
    filter: filterReducer
  },
});
