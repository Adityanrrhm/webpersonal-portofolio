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
    <div className="fixed top-8 right-8 z-[100] animate-in slide-in-from-top-4 slide-in-from-right-4 fade-in duration-300">
      <div
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-xl border backdrop-blur-sm text-base font-semibold ${
          toast.type === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        {toast.type === "success" ? (
          <CheckCircle className="w-6 h-6 shrink-0 text-emerald-500" />
        ) : (
          <XCircle className="w-6 h-6 shrink-0 text-red-500" />
        )}
        <span className="pr-4">{toast.message}</span>
        <button onClick={onDismiss} className="ml-auto opacity-60 hover:opacity-100 transition-all active:scale-[0.92] bg-white/50 rounded-full p-1">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
