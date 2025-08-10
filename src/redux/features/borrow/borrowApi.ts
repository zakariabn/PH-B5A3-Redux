import type {
  IBorrowPayload,
  IBorrowResponse,
  ISummaryResponse,
} from "@/types/borrow.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  tagTypes: ["BorrowSummary", "Books"],

  endpoints: (builder) => ({
    // get book summary
    getBorrowSummary: builder.query<ISummaryResponse, void>({
      query: () => `/borrow`,
      providesTags: ["BorrowSummary"],
      // transformResponse: (response) => {
      //   return response.data;
      // },
    }),

    createBorrow: builder.mutation<IBorrowResponse, IBorrowPayload>({
      query: (newBorrow) => ({
        url: "/borrow",
        method: "POST",
        body: newBorrow,
      }),
      invalidatesTags: ["BorrowSummary", "Books"],
    }),
  }),
});

export const { useGetBorrowSummaryQuery, useCreateBorrowMutation } = borrowApi;
