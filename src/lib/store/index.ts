import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading-slice";
import sendingReducer from "./sending-slice";
import showHideReducer from "./show-hide-slice";
import filterReducer from "./filter-slice";
import pageReducer from "./pages-slice";
import uniqueIdReducer from "./generate-unique-id-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {loading: loadingReducer, sending: sendingReducer,showHide: showHideReducer, filter: filterReducer, uniqueId: persistedReducer, pages: pageReducer}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
