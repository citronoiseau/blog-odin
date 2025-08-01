import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Toast.module.css";

export default function Toast({ message, alert, duration, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);

    const hideTimer = setTimeout(() => setVisible(false), duration);

    const removeTimer = setTimeout(() => {
      onClose();
    }, duration + 300);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  return ReactDOM.createPortal(
    <div
      className={`${styles.toast} ${alert ? styles.alert : ""} ${
        visible ? styles.show : ""
      }`}
    >
      {message}
    </div>,
    document.body
  );
}
