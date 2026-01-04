import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  JobsQueryResponse,
  JobQueryResponse,
  ApplyJobMutationRequest,
  ApplyJobMutationResponse,
  Job,
  ToggleSavedJobResponse,
  EditJobRequest,
} from "../types/jobTypes";

const isProduction = import.meta.env.PROD;

const baseUrl = isProduction
  ? "/"
  : import.meta.env.VITE_APP_API_URL || "http://localhost:4000";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      query: () => (isProduction ? "jobs.json" : "jobs"),
      transformResponse: (response: JobsQueryResponse | Job[]) => {
        if (Array.isArray(response)) return response;
        return response.jobs || [];
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((job) => ({ type: "Jobs" as const, id: job.id })),
              { type: "Jobs", id: "LIST" },
            ]
          : [{ type: "Jobs", id: "LIST" }],
    }),

    getJobById: builder.query<Job | undefined, string>({
      query: (id) => (isProduction ? "jobs.json" : `jobs/${id}`),
      transformResponse: (
        response: JobQueryResponse | Job | JobsQueryResponse,
        _meta,
        arg
      ) => {
        if (!isProduction) {
          return (response as JobQueryResponse).job || (response as Job);
        }
        return (response as JobsQueryResponse).jobs?.find(
          (j: Job) => j.id === arg
        );
      },
      providesTags: (_result, _error, id) => [{ type: "Jobs", id }],
    }),

    addJob: builder.mutation<Job, Omit<Job, "id">>({
      query: (newJob) => ({
        url: isProduction ? "jobs.json" : "/jobs",
        method: isProduction ? "GET" : "POST",
        body: isProduction ? undefined : { ...newJob, applied: false },
      }),
      async onQueryStarted(newJob, { dispatch, queryFulfilled }) {
        if (isProduction) {
          const tempId = crypto.randomUUID();
          const patchResult = dispatch(
            jobsApi.util.updateQueryData("getJobs", undefined, (draft) => {
              draft.push({ ...newJob, id: tempId, applied: false } as Job);
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        }
      },
      invalidatesTags: isProduction ? [] : [{ type: "Jobs", id: "LIST" }],
    }),

    editJob: builder.mutation<Job, EditJobRequest>({
      query: ({ id, data }) => {
        return {
          url: isProduction ? "jobs.json" : `/jobs/${id}`,
          method: isProduction ? "GET" : "PUT",
          body: isProduction ? undefined : data,
        };
      },
      invalidatesTags: isProduction ? [] : [{ type: "Jobs", id: "LIST" }],
    }),

    applyJob: builder.mutation<
      ApplyJobMutationResponse,
      ApplyJobMutationRequest
    >({
      query: ({ id }) => ({
        url: isProduction ? "jobs.json" : `jobs/${id}`,
        method: isProduction ? "GET" : "PATCH",
        body: isProduction ? undefined : { applied: true },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          jobsApi.util.updateQueryData("getJobs", undefined, (draft) => {
            const job = draft.find((j) => j.id === id);
            if (job) job.applied = true;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    toggleSavedJob: builder.mutation<
      ToggleSavedJobResponse,
      ApplyJobMutationRequest & { saved: boolean }
    >({
      query: ({ id, saved }) => ({
        url: isProduction ? "jobs.json" : `jobs/${id}`,
        method: isProduction ? "GET" : "PATCH",
        body: isProduction ? undefined : { saved },
      }),
      async onQueryStarted({ id, saved }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          jobsApi.util.updateQueryData("getJobs", undefined, (draft) => {
            const job = draft.find((j) => j.id === id);
            if (job) job.saved = saved;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetJobsQuery,
  useAddJobMutation,
  useGetJobByIdQuery,
  useEditJobMutation,
  useApplyJobMutation,
  useToggleSavedJobMutation,
} = jobsApi;
