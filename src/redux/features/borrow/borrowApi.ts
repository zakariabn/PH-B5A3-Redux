import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),

  endpoints: (builder) => ({
    // get book summary
    getBorrowSummary: builder.query({
      query: () => `/borrow`,
    }),
  }),
});

export const { useGetBorrowSummaryQuery } = borrowApi;
