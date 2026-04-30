import { useState } from "react";
import Buttons from "../../shared/components/buttons/Buttons";
import { useAddJobMutation } from "../../api/jobsApi";
import type { Job } from "../../types/jobTypes";

import styles from "./style.module.scss";

interface CreateJobProps {
  onClose: () => void;
}

const CreateJob = ({ onClose }: CreateJobProps) => {
  const [addJob, { isLoading }] = useAddJobMutation();

  const [formData, setFormData] = useState<Omit<Job, "id" | "applied">>({
    title: "",
    position: "",
    company: "",
    location: "",
    salary: "",
    about: "",
    requirements: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    if (name === "requirements") {
      setFormData({
        ...formData,
        requirements: value.split(",").map((r) => r.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addJob(formData).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to create job:", err);
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Create New Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            required
          />
          <input
            name="position"
            placeholder="Position (e.g. Junior, Senior)"
            onChange={handleChange}
            required
          />
          <input
            name="company"
            placeholder="Company Name"
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location (e.g. Remote)"
            onChange={handleChange}
            required
          />
          <input
            name="salary"
            placeholder="Salary Range"
            onChange={handleChange}
          />
          <textarea
            name="about"
            placeholder="Job Description"
            onChange={handleChange}
            required
          />
          <textarea
            name="requirements"
            placeholder="Requirements (comma separated)"
            onChange={handleChange}
          />

          <div className={styles.actions}>
            <Buttons
              onCancel={onClose}
              submitText="Create Job"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
