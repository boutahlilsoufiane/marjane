import React, { createContext, useContext, useState, ReactNode } from "react";

interface toastContextProps {
  toast: {
    isVisible: boolean;
    timeout: number;
    message: string;
    variant: "success" | "error" | "info";
  };
  showToast: (
    message: string,
    variant: "success" | "error" | "info",
    timeout?: number,
    isVisible?: boolean,
  ) => void;
}

const ToastContext = createContext<toastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<toastContextProps["toast"]>({
    timeout: 3000,
    message: "",
    isVisible: false,
    variant: "success",
  });
  const showToast = (
    message: string,
    variant: "success" | "error" | "info",
    timeout = 3000,
    isVisible = true,
  ) => {
    setToast({ message, variant, timeout, isVisible });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, message: "", isVisible: false }));
    }, timeout);
  };
  const value = { toast, showToast };
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
