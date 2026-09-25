"use client";

import { useFitLog } from "@/app/context/FitLogContext";

const WorkoutActions = ({ workout }) => {
  const {
    plan,
    saved,
    addToPlan,
    saveWorkout,
  } = useFitLog();

  if (!workout?.id) {
    return null;
  }


  const isInPlan = plan.some(
    (item) =>
      String(item?.id) === String(workout.id)
  );

  const isSaved = saved.some(
    (item) =>
      String(item?.id) === String(workout.id)
  );

  

  const handleAddToPlan = () => {
  
    if (isInPlan || isSaved) {
      return;
    }

    addToPlan(workout);
  };

 

  const handleSave = () => {
    if (isSaved || isInPlan) {
      return;
    }

    saveWorkout(workout);
  };

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">

     

      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={isInPlan || isSaved}
        className={`
          flex items-center justify-center
          rounded-xl px-6 py-4
          text-sm font-black uppercase
          transition-all duration-200

          ${
            isInPlan
              ? "cursor-not-allowed bg-[#CCFF00]/20 text-[#CCFF00]/50"
              : isSaved
              ? "cursor-not-allowed bg-white/[0.04] text-white/20"
              : "bg-[#CCFF00] text-black hover:bg-[#d9ff3f] active:scale-[0.98]"
          }
        `}
      >
        {isInPlan
          ? "✓ Added To Today's Plan"
          : isSaved
          ? "Saved — Add Disabled"
          : "+ Add To Today's Plan"}
      </button>


   

      <button
        type="button"
        onClick={handleSave}
        disabled={isSaved || isInPlan}
        className={`
          flex items-center justify-center
          rounded-xl border px-6 py-4
          text-sm font-black uppercase
          transition-all duration-200

          ${
            isSaved
              ? "cursor-not-allowed border-[#CCFF00]/20 bg-[#CCFF00]/10 text-[#CCFF00]/60"
              : isInPlan
              ? "cursor-not-allowed border-white/10 bg-white/[0.03] text-white/20"
              : "border-white/10 bg-white/[0.03] text-white hover:border-[#CCFF00]/40 hover:text-[#CCFF00] active:scale-[0.98]"
          }
        `}
      >
        {isSaved
          ? "♡ Saved For Later"
          : isInPlan
          ? "In Today's Plan"
          : "♡ Save For Later"}
      </button>

    </div>
  );
};

export default WorkoutActions;