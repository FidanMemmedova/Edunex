// src/shared/store/api/apiSlice.ts
import { privateAxios } from "@/shared/utils/axios/private";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = async ({ url, method, body, params }: any) => {
  try {
    const result = await privateAxios({
      url,
      method,
      data: body,
      params,
    });

    return { data: result.data };
  } catch (axiosError: any) {
    let err = axiosError;

    if (!err.response) {
      throw axiosError;
    }

    return {
      error: {
        status: err.response.status,
        data: err.response.data,
      },
    };
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});

export const {} = apiSlice;
