import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const mockJobs = [
  { id: "1", title: "Dev 1", applied: false, saved: false },
  { id: "2", title: "Dev 2", applied: false, saved: false },
];

export const server = setupServer(
  http.get("http://localhost:4000/jobs", () => {
    return HttpResponse.json(mockJobs);
  }),

  http.delete("http://localhost:4000/jobs/:id", () => {
    return HttpResponse.json({});
  }),
);