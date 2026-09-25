"use client";

import { useFitLog } from "@/app/context/FitLogContext";
import { useState } from "react";

const WorkoutActions = ({ workout }) => {
  const {
    plan,
    saved,
    addToPlan,
    saveWorkout,
  } = useFitLog();

  const [toast, setToast] = useState("");

  if (!workout) return null;

  const isInPlan = plan.some(
    (item) => item?.id === workout.id
  );

  const isSaved = saved.some(
    (item) => item?.id === workout.id
  );

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleAddToPlan = () => {
    if (!workout?.id) return;

    if (isInPlan) return;

    addToPlan(workout);

    showToast("Added to today's plan");
  };

  const handleSave = () => {
    if (!workout?.id) return;

    if (isSaved) return;

    saveWorkout(workout);

    showToast("Saved for later");
  };

  return (
    <>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">

        {/* ADD TO PLAN */}
        <button
          onClick={handleAddToPlan}
          disabled={isInPlan}
          className={`flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-black uppercase transition ${
            isInPlan
              ? "cursor-not-allowed bg-white/10 text-white/30"
              : "bg-[#ccff00] text-black hover:bg-[#ddff4d]"
          }`}
        >
          <span>
            {isInPlan ? "✓" : "+"}
          </span>

          {isInPlan
            ? "Added To Today's Plan"
            : "Add To Today's Plan"}
        </button>


        {/* SAVE */}
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`flex items-center justify-center gap-2 rounded-xl border px-6 py-4 text-xs font-black uppercase transition ${
            isSaved
              ? "cursor-not-allowed border-white/10 bg-white/10 text-white/30"
              : "border-white/10 bg-white/[0.03] text-white hover:border-[#ccff00]/40 hover:text-[#ccff00]"
          }`}
        >
          <span>
            {isSaved ? "♥" : "♡"}
          </span>

          {isSaved
            ? "Saved"
            : "Save For Later"}
        </button>

      </div>


      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">

          <div className="flex items-center gap-3 rounded-full border border-[#ccff00]/20 bg-[#111419]/95 px-5 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
              ✓
            </span>

            <span className="text-xs font-bold text-white">
              {toast}
            </span>

          </div>

        </div>
      )}
    </>
  );
};

export default WorkoutActions;