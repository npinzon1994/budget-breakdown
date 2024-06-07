"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store, persistor } from "src/lib/store";
import { PersistGate } from "redux-persist/integration/react";

const App = dynamic(() => import("../../App"), { ssr: false });

export function ClientOnly() {
  return <App />;
}
