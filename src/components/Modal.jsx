import styles from "./Modal.module.css";

function Modal({ children }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContents}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
