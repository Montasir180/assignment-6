"use client";

import { useFitLog } from "@/app/context/FitLogContext";

const Toast = () => {
  const { toast } = useFitLog();

  if (!toast) return null;

  const styles = {
    success: {
      icon: "✓",
      border: "border-[#CCFF00]/30",
      iconBg: "bg-[#CCFF00]",
      iconColor: "text-black",
    },

    save: {
      icon: "♡",
      border: "border-[#CCFF00]/30",
      iconBg: "bg-[#CCFF00]",
      iconColor: "text-black",
    },

    delete: {
      icon: "×",
      border: "border-red-500/30",
      iconBg: "bg-red-500",
      iconColor: "text-white",
    },

    error: {
      icon: "!",
      border: "border-red-500/30",
      iconBg: "bg-red-500",
      iconColor: "text-white",
    },

    info: {
      icon: "i",
      border: "border-white/20",
      iconBg: "bg-white/20",
      iconColor: "text-white",
    },
  };

  const style = styles[toast.type] || styles.success;

  return (
    <div className="fixed right-5 top-5 z-[9999] w-[calc(100%-40px)] max-w-sm animate-[toastIn_.3s_ease-out]">
      <div
        className={`flex items-center gap-3 rounded-2xl border ${style.border} bg-[#111317]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl`}
      >
      
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.iconBg} ${style.iconColor} text-sm font-black`}
        >
          {style.icon}
        </div>

       
        <p className="text-sm font-semibold leading-5 text-white">
          {toast.message}
        </p>
      </div>
    </div>
  );
};

export default Toast;