import { useState } from "react";
import { useEditJobMutation } from "../../api/jobsApi";
import type { Job } from "../../types/jobTypes";

import styles from "./styles.module.scss";
import Buttons from "../../shared/components/buttons/Buttons";

interface EditJobProps {
  job: Job;
  onClose: () => void;
  onUpdate: (updatedJob: Job) => void;
}

const UpdateJob = ({ job, onClose, onUpdate }: EditJobProps) => {
  const [editJob, { isLoading }] = useEditJobMutation();

  const [formData, setFormData] = useState<Omit<Job, "id" | "edited">>({
    title: job.title,
    position: job.position,
    company: job.company,
    location: job.location,
    salary: job.salary ?? "",
    about: job.about,
    requirements: job.requirements,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editJob({ id: job.id, data: formData }).unwrap();
      const updatedJob: Job = {
        ...job,
        ...formData,
        edited: true,
      };

      onUpdate(updatedJob);
      onClose();
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormData({
      ...formData,
      [name]:
        name === "requirements" ? value.split(",").map((r) => r.trim()) : value,
    });
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Edit Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            placeholder="Job Title"
            onChange={handleChange}
            required
          />
          <input
            name="position"
            value={formData.position}
            placeholder="Position (e.g. Junior, Senior)"
            onChange={handleChange}
            required
          />
          <input
            name="company"
            value={formData.company}
            placeholder="Company Name"
            onChange={handleChange}
            required
          />
          <input
            name="location"
            value={formData.location}
            placeholder="Location (e.g. Remote)"
            onChange={handleChange}
            required
          />
          <input
            name="salary"
            value={formData.salary}
            placeholder="Salary Range"
            onChange={handleChange}
          />
          <textarea
            name="about"
            value={formData.about}
            placeholder="Job Description"
            onChange={handleChange}
            style={{ height: "100px" }}
            required
          />
          <textarea
            name="requirements"
            value={formData.requirements.join(", ")}
            placeholder="Requirements (comma separated)"
            onChange={handleChange}
            style={{ height: "100px" }}
          />

          <div className={styles.actions}>
            <Buttons
              onCancel={onClose}
              submitText="Update Job"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
