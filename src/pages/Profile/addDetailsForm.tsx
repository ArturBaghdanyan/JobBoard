import { useForm, type SubmitHandler } from "react-hook-form";
import type { UserDetails, UserProfile } from "../../types/auth";

import style from "./style.module.scss";

interface IDetails {
  initialData?: UserProfile["details"];
  onSave: (details: UserProfile["details"]) => void;
}

export const AddDetailsForm = ({ initialData, onSave }: IDetails) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>();

  const onSubmit: SubmitHandler<UserDetails> = (data) => {
    console.log("data updated", data);
    onSave(data);
  };
  return (
    <>
      <div className={style.detailTitle}>
        <h2>Personal data</h2>
        <button className={style.close} onClick={() => onSave(initialData)}>
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
        </div>
        <div className={style.form_column}>
          <div className={style.field}>
            <label className={style.label}>date</label>
            <input
              type="date"
              className={style.input}
              {...register("date", { required: "date is required" })}
            />
            {errors.date && (
              <p className={style.error}>{errors.date.message}</p>
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
          <button
            type="submit"
            onClick={() => onSave(initialData)}
            className={style.button}
          >
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
