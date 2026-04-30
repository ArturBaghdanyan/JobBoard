import style from "./style.module.scss";

interface RemoveJobItemProps {
  closeModal: () => void;
  selectedJob: {
    id: string;
    title: string;
  };
  handleConfirmDelete: () => void;
}
const RemoveJobItem = ({
  closeModal,
  selectedJob,
  handleConfirmDelete,
}: RemoveJobItemProps) => {
  return (
    <div onClick={closeModal} className={style.modal_overlay}>
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the job "{selectedJob.title}"?</p>
        <div className={style.modal_content_buttons}>
          <button onClick={closeModal} className={style.cancel_button}>
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className={style.confirm_button}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveJobItem;
