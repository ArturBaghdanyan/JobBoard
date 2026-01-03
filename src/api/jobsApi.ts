import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  JobsQueryResponse,
  JobQueryResponse,
  ApplyJobMutationRequest,
  ApplyJobMutationResponse,
  Job,
  ToggleSavedJobResponse,
} from "../types/jobTypes";

const api = import.meta.env.VITE_APP_API_URL;
export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<JobsQueryResponse, void>({
      query: () => "jobs",
      providesTags: (result) =>
        result
          ? [
              ...result.map((job) => ({ type: "Jobs" as const, id: job.id })),
              { type: "Jobs", id: "LIST" },
            ]
          : [{ type: "Jobs", id: "LIST" }],
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
      invalidatesTags: [{ type: "Jobs", id: "LIST" }],
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
      invalidatesTags: (_result, _error, { id }) => [{ type: "Jobs", id }],
    }),
    toggleSavedJob: builder.mutation<
      ToggleSavedJobResponse,
      ApplyJobMutationRequest & { saved: boolean }
    >({
      query: ({ id, saved }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: { saved },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Jobs", id }],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useAddJobMutation,
  useGetJobByIdQuery,
  useApplyJobMutation,
  useToggleSavedJobMutation,
} = jobsApi;
