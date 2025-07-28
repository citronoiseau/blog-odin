import ReactDOM from "react-dom";
import styles from "./Toast.module.css";

export default function Toast({ message, alert }) {
  return ReactDOM.createPortal(
    <div
      className={`${styles.toast} ${alert ? styles.alert : ""} ${styles.show}`}
    >
      {message}
    </div>,
    document.body
  );
}
