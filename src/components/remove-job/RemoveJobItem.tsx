import Modal from "../../shared/components/Modal/Modal";
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
    <Modal onClose={closeModal}>
      <div className={style.delete_modal}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the job "{selectedJob.title}"?</p>
        <div className={style.delete_modal_buttons}>
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
    </Modal>
  );
};

export default RemoveJobItem;
