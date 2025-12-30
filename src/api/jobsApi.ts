import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  JobsQueryResponse,
  JobQueryResponse,
  ApplyJobMutationRequest,
  ApplyJobMutationResponse,
  Job,
} from "../types/jobTypes";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<JobsQueryResponse, void>({
      query: () => "/jobs",
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query<JobQueryResponse, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (result) =>
        result?.job ? [{ type: "Jobs" as const, id: result.job.id }] : [],
    }),
    addJob: builder.mutation<Job, Omit<Job, "id">>({
      query: (newJob) => ({
        url: "/jobs",
        method: "POST",
        body: { ...newJob, applied: false },
      }),
      invalidatesTags: ["Jobs"],
    }),
    applyJob: builder.mutation<
      ApplyJobMutationResponse,
      ApplyJobMutationRequest
    >({
      query: ({ id }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: { applied: true },
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useAddJobMutation,
  useGetJobByIdQuery,
  useApplyJobMutation,
} = jobsApi;
