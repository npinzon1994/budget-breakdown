import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB0QkdzR5vSDHCgQkMnlQg_YKPWA9wgcWQ",
  authDomain: "budget-breakdown-85145.firebaseapp.com",
  databaseURL: "https://budget-breakdown-85145-default-rtdb.firebaseio.com",
  projectId: "budget-breakdown-85145",
  storageBucket: "budget-breakdown-85145.appspot.com",
  messagingSenderId: "446762151050",
  appId: "1:446762151050:web:86fea1efcc80860cb7d173",
  measurementId: "G-9F9SWV7D7S"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);