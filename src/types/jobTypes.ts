export type Job = {
  id: string;
  title: string;
  position: string;
  company: string;
  location: string;
  salary?: string;
  about: string;
  requirements: string[];
  applied?: boolean;
};
export type JobsQueryResponse = Job[];

export type JobQueryResponse = {
  job: Job | null;
};

export type ApplyJobMutationRequest = {
  id: string;
};

export type ApplyJobMutationResponse = {
  success: boolean;
};

export interface ToggleSavedJobResponse {
  id: string;
  saved: boolean;
}
