import { useForm, type SubmitHandler } from "react-hook-form";
import type { UserDetails } from "../../types/auth";
import type { Dispatch, SetStateAction } from "react";

import style from "./style.module.scss";

interface IDetails {
  setShowUserDetails: Dispatch<SetStateAction<boolean>>;
}

export const AddDetailsForm = ({ setShowUserDetails }: IDetails) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>();

  const onSubmit: SubmitHandler<UserDetails> = (data) => {
    try {
      console.log("adding details", data);
      setShowUserDetails(false);
    } catch (error) {
      console.error("Save failed", error);
    }
  };
  return (
    <>
      <div className={style.detailTitle}>
        <h2>Personal data</h2>
        <button
          className={style.close}
          onClick={() => setShowUserDetails(false)}
        >
          x
        </button>
      </div>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.field}>
          <label className={style.label}>Username</label>
          <input
            className={style.input}
            {...register("username", { required: "Name is required" })}
          />
          {errors.username && (
            <p className={style.error}>{errors.username.message}</p>
          )}
        </div>

        <div className={style.form_column}>
          <div className={style.form_column_field}>
            <label className={style.label}>City</label>
            <input
              className={style.input}
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className={style.error}>{errors.city.message}</p>
            )}
          </div>

          <div className={style.field}>
            <label className={style.label}>Address</label>
            <input
              className={style.input}
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className={style.error}>{errors.address.message}</p>
            )}
          </div>
        </div>
        <div className={style.form_column}>
          <div className={style.field}>
            <label className={style.label}>Birthday</label>
            <input
              type="date"
              className={style.input}
              {...register("birthday", { required: "Birthday is required" })}
            />
            {errors.birthday && (
              <p className={style.error}>{errors.birthday.message}</p>
            )}
          </div>

          <div className={style.field}>
            <label className={style.label}>Tel.</label>
            <input
              type="tel"
              className={style.input}
              {...register("telephone", {
                required: "Telephone is required",
              })}
            />
            {errors.telephone && (
              <p className={style.error}>{errors.telephone.message}</p>
            )}
          </div>
        </div>
        <div className={style.buttons}>
          <button type="submit" className={style.button}>
            Cancel
          </button>
          <button type="submit" className={style.button}>
            Save
          </button>
        </div>
      </form>
    </>
  );
};
