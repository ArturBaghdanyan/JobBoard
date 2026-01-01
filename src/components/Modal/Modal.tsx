import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

interface Props {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal = ({ children, onClose }: Props) => {
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
