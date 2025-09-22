"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  endpoints: (builder) => ({
    generateEmailBody: builder.mutation({
      query: (formData) => ({
        url: "user/email-body",
        method: "POST",
        body: formData,
      }),
    }),
    jobApply: builder.mutation({
      query: (playLoad) => ({
        url: "user/premium/apply",
        method: "POST",
        body: playLoad,
      }),
    }),
  }),
});

export const { useGenerateEmailBodyMutation, useJobApplyMutation } = baseApi;
