import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import type { Form } from "../../types/auth";
import { registerUser } from "../../helpers/api";

import styles from "../style.module.scss";

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      await registerUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Register failed", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>Create Account</h1>

        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
        <div className={styles.signs}>
          <Link to="/register" className={styles.signs_button}>
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};
