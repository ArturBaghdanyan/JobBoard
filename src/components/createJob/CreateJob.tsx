import { useState } from "react";
import { useApplyJobMutation } from "../../api/jobsApi";
import { v4 } from "uuid";

import styles from "./style.module.scss";

interface CreateJobProps {
    onClose: () => void;
}
const CreateJob = ({ onClose }: CreateJobProps) => {
  const [addJob, { isLoading }] = useApplyJobMutation();

  const [formData, setFormData] = useState({
    id: v4(),
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addJob(formData).unwrap();
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
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            onChange={handleChange}
            required
          />

          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
