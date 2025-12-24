import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import type { UserProfile } from "../../types/auth";
import { useAuth } from "../../hooks/useAuth";

import styles from "../style.module.scss";


export const Register = () => {
  const navigate = useNavigate();

  const { register: registerAction, error: authError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>();

  const onSubmit: SubmitHandler<UserProfile> = async (data) => {
    const success = await registerAction(data);

    if (success) {
      alert("Registration successful! You can now login.");
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>Create Account</h1>

        {authError && <p className={styles.error_summary}>{authError}</p>}

        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            {...register("username", { required: "Name is required" })}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
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
                message: "Invalid email format",
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
          <Link to="/login" className={styles.signs_button}>
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};
