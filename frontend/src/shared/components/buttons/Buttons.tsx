import style from "./style.module.scss";

interface ButtonsProps {
  onCancel?: () => void;
  submitText?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

const Buttons = ({ onClick, onCancel, submitText, isLoading }: ButtonsProps) => {
  return (
    <div className={style.buttons} onClick={onClick}>
      <button type="button" onClick={onCancel} className={style.button}>
        Cancel
      </button>

      <button type="submit" className={style.button} disabled={isLoading}>
        {isLoading ? "Saving..." : submitText}
      </button>
    </div>
  );
};

export default Buttons;
