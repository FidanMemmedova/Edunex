import { IOptions, IStepBody } from "@/shared/types";
import { apiSlice } from "./apiSlice";

export const examOptions = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOptions: builder.query<
      IOptions,
      {
        subject_id?: string;
        grade?: number;
        type?: string;
        subject_units?: number[];
      }
    >({
      query: (params) => {
        return {
          url: `/exams/options`,
          params,
          method: "GET",
        };
      },
    }),
    createExam: builder.mutation<
      {
        data: { steps: []; uuid: string };
      },
      any
    >({
      query: (body) => ({
        url: "/exams",
        method: "POST",
        body,
      }),
    }),
    continueExam: builder.query<any, any>({
      query: (uuid) => ({
        url: `exams/${uuid}/continue`,
        method: "GET",
      }),
    }),
    postStepExam: builder.mutation<
      any,
      { body: IStepBody; uuid: string | null }
    >({
      query: ({ body, uuid }) => ({
        url: `exams/${uuid}/step`,
        body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetOptionsQuery,
  useLazyGetOptionsQuery,
  useCreateExamMutation,
  useContinueExamQuery,
  usePostStepExamMutation,
} = examOptions;
