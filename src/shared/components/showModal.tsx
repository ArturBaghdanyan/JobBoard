import { useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";

interface IShowModal {
  showModal: boolean;
  setShowModal: (e: boolean) => void;
  modalType: string | null;
}

const ShowModal = ({ showModal, setShowModal, modalType }: IShowModal) => {
  const navigate = useNavigate();

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {modalType === "login" && (
            <>
              <div className="modal-column">
                <div className="modal-icon">🔒</div>
                <h2 className="modal-title">Login required</h2>
                <p className="modal-text">
                  You need to be logged in to apply for this job.
                </p>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="modal-login"
                  onClick={() => navigate("/login")}
                >
                  Go to login
                </button>
              </div>
            </>
          )}

          {modalType === "success" && (
            <>
              <div className="modal-column">
                <div className="modal-icon">✅</div>
                <h2 className="modal-title">Application sent</h2>
                <p className="modal-text">
                  You have successfully applied for this job.
                </p>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-login"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default ShowModal;
