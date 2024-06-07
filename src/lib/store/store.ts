import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading-slice";
import sendingReducer from "./sending-slice";
import showHideReducer from "./show-hide-slice";
import filterReducer from "./filter-slice";
import pageReducer from "./pages-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      loading: loadingReducer,
      sending: sendingReducer,
      showHide: showHideReducer,
      filter: filterReducer,
      pages: pageReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
