import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { blogReducer } from "../slices/blogSlice";
import { bookmarkReducer } from "../slices/bookmarkSlice";

const persistConfig = {
  key: "blog-bookmark",
  storage,
  version: 1,
  stateReconciler: autoMergeLevel2,
};

const persistBookmark = persistReducer(persistConfig, bookmarkReducer);

export const store = configureStore({
  reducer: {
    bookmark: persistBookmark,
    blogs: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
  devTools: true,
});

export const newStore = persistStore(store);
