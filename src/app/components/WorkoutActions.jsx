"use client";

import { useFitLog } from "@/app/context/FitLogContext";

const WorkoutActions = ({ workout }) => {
  const {
    plan,
    saved,
    addToPlan,
    saveWorkout,
  } = useFitLog();

  if (!workout) {
    return null;
  }


  const isInPlan = plan.some(
    (item) => item?.id === workout.id
  );


  const isSaved = saved.some(
    (item) => item?.id === workout.id
  );

  const handleAddToPlan = () => {
    if (!workout?.id) return;

    addToPlan(workout);
  };

  const handleSave = () => {
    if (!workout?.id) return;

    saveWorkout(workout);
  };

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">

    
      <button
        onClick={handleAddToPlan}
        disabled={isInPlan || isSaved}
        className={`flex items-center justify-center rounded-xl px-6 py-4 text-sm font-black uppercase transition ${
          isInPlan || isSaved
            ? "cursor-not-allowed bg-white/10 text-white/30"
            : "bg-[#CCFF00] text-black hover:bg-[#d9ff3f]"
        }`}
      >
        {isInPlan
          ? "✓ Added To Today's Plan"
          : isSaved
          ? "Already Saved"
          : "+ Add To Today's Plan"}
      </button>

  
      <button
        onClick={handleSave}
        disabled={isSaved || isInPlan}
        className={`flex items-center justify-center rounded-xl border px-6 py-4 text-sm font-black uppercase transition ${
          isSaved || isInPlan
            ? "cursor-not-allowed border-white/10 bg-white/10 text-white/30"
            : "border-white/10 bg-white/[0.03] text-white hover:border-[#CCFF00]/40 hover:text-[#CCFF00]"
        }`}
      >
        {isSaved
          ? "♡ Saved"
          : isInPlan
          ? "Already In Plan"
          : "♡ Save For Later"}
      </button>

    </div>
  );
};

export default WorkoutActions;