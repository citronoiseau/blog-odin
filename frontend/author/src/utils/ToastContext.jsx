import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Toast from "../components/Toast/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, alert = false, duration = 2000) => {
    setToast({ message, alert, duration });
  }, []);

  const handleClose = useCallback(() => setToast(null), []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          alert={toast.alert}
          duration={toast.duration}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
