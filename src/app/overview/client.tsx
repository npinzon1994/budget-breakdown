"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store, persistor } from "src/redux-store";
import { PersistGate } from "redux-persist/integration/react";

const App = dynamic(() => import("../../App"), { ssr: false });

export function ClientOnly() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
