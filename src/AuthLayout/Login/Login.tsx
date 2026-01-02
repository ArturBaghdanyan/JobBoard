import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import type { SubmitHandler } from "react-hook-form";
import type { UserProfile } from "../../types/auth";

import styles from "../style.module.scss";

export const Login = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>();

  const onSubmit: SubmitHandler<UserProfile> = async (data) => {
    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Login</h1>
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
          {isSubmitting ? "Logging in..." : "Sign In"}
        </button>
        <div className={styles.signs}>
          <Link to="/register" className={styles.signs_button}>
            If you don't have an account, Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};
