import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading-slice";
import sendingReducer from "./sending-slice";
import showHideReducer from "./show-hide-slice";
import filterReducer from "./filter-slice";
import uniqueIdReducer from "./generate-unique-id-slice";
import pageReducer from "./pages-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "bbRoot",
  storage,
};

const persistedReducer = persistReducer(persistConfig, uniqueIdReducer);

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    sending: sendingReducer,
    showHide: showHideReducer,
    filter: filterReducer,
    uniqueId: persistedReducer,
    pages: pageReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
