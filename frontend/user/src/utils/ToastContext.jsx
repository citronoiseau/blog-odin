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

  const showToast = useCallback((message, alert = false, duration) => {
    setToast({ message, alert, duration });
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} alert={toast.alert} />}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
