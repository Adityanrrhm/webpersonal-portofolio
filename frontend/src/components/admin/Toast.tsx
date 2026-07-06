"use client";

import { useState, useCallback } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastState {
  show: boolean;
  type: "success" | "error";
  message: string;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({ show: false, type: "success", message: "" });

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  }, []);

  const dismissToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  return { toast, showToast, dismissToast };
}

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastState;
  onDismiss: () => void;
}) {
  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-2 fade-in duration-200">
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border backdrop-blur-sm text-sm font-medium ${
          toast.type === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        {toast.type === "success" ? (
          <CheckCircle className="w-5 h-5 shrink-0 text-emerald-500" />
        ) : (
          <XCircle className="w-5 h-5 shrink-0 text-red-500" />
        )}
        <span>{toast.message}</span>
        <button onClick={onDismiss} className="ml-2 opacity-60 hover:opacity-100 transition-all active:scale-[0.92]">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
