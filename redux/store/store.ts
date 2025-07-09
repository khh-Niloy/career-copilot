"use client";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import resumeReducer from "../features/resumeSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    resume: resumeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["resume/storeResumeFile"],
        ignoredPaths: ["resume.resumeFile"],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
