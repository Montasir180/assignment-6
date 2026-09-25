"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useFitLog } from "@/app/context/FitLogContext";

const MyPlanPage = () => {
  const {
    plan = [],
    saved = [],
    removeFromPlan,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [completed, setCompleted] = useState([]);
  const [toast, setToast] = useState("");

  const currentItems =
    activeTab === "plan" ? plan : saved;

  // -----------------------------
  // TOTAL MINUTES
  // -----------------------------
  const totalMinutes = useMemo(() => {
    return plan.reduce((total, workout) => {
      return total + Number(workout?.duration || 0);
    }, 0);
  }, [plan]);

  // -----------------------------
  // TOTAL CALORIES
  // -----------------------------
  const totalCalories = useMemo(() => {
    return plan.reduce((total, workout) => {
      return (
        total +
        Number(
          workout?.caloriesBurned ??
            workout?.calories ??
            0
        )
      );
    }, 0);
  }, [plan]);

  // -----------------------------
  // SORT
  // -----------------------------
  const sortedItems = useMemo(() => {
    const items = [...currentItems];

    items.sort((a, b) => {
      if (sortBy === "duration") {
        return (
          Number(a?.duration || 0) -
          Number(b?.duration || 0)
        );
      }

      if (sortBy === "calories") {
        return (
          Number(
            b?.caloriesBurned ??
              b?.calories ??
              0
          ) -
          Number(
            a?.caloriesBurned ??
              a?.calories ??
              0
          )
        );
      }

      if (sortBy === "rating") {
        return (
          Number(b?.rating || 0) -
          Number(a?.rating || 0)
        );
      }

      return 0;
    });

    return items;
  }, [currentItems, sortBy]);

  // -----------------------------
  // TOAST
  // -----------------------------
  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  // -----------------------------
  // MARK AS DONE
  // -----------------------------
  const handleDone = (id) => {
    if (completed.includes(id)) {
      return;
    }

    setCompleted((prev) => [
      ...prev,
      id,
    ]);

    showToast("Workout marked as completed");
  };

  // -----------------------------
  // REMOVE
  // -----------------------------
  const handleRemove = (id) => {
    if (removeFromPlan) {
      removeFromPlan(id);
      showToast("Workout removed from your plan");
    }
  };

  return (
    <main className="min-h-screen bg-[#080a0d] text-white">

      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <section className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* =====================================
            HEADER
        ===================================== */}
        <div className="mb-8">

          <div className="flex items-end justify-between gap-5">

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#ccff00]">
                FITLOG / TRAINING
              </p>

              <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
                My Plan
              </h1>

              <p className="mt-2 max-w-xl text-xs leading-5 text-white/40 sm:text-sm">
                Cap of five lifts for today. Finish them,
                then load more.
              </p>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-[10px] uppercase tracking-wider text-white/30">
                Today
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                {plan.length}/5 workouts
              </p>
            </div>

          </div>

        </div>


        {/* =====================================
            STATS
        ===================================== */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] backdrop-blur-xl">

          {/* glass glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#ccff00]/[0.06] blur-3xl" />

          <div className="grid grid-cols-1 sm:grid-cols-3">

            {/* EXERCISES */}
            <div className="border-b border-white/[0.07] p-5 sm:border-b-0 sm:border-r">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">
                Exercises
              </p>

              <p className="mt-2 text-3xl font-black text-[#ccff00]">
                {plan.length}
              </p>
            </div>


            {/* MINUTES */}
            <div className="border-b border-white/[0.07] p-5 sm:border-b-0 sm:border-r">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">
                Minutes
              </p>

              <p className="mt-2 text-3xl font-black">
                {totalMinutes}
              </p>
            </div>


            {/* CALORIES */}
            <div className="p-5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">
                Calories
              </p>

              <p className="mt-2 text-3xl font-black">
                {totalCalories}
              </p>
            </div>

          </div>
        </div>


        {/* =====================================
            TABS + SORT
        ===================================== */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* TABS */}
          <div className="flex w-fit rounded-xl border border-white/[0.08] bg-white/[0.035] p-1 backdrop-blur-xl">

            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-lg px-4 py-2 text-[11px] font-bold transition ${
                activeTab === "plan"
                  ? "bg-white/[0.08] text-white shadow-sm"
                  : "text-white/35 hover:text-white"
              }`}
            >
              Today's Plan
              <span className="ml-2 text-[#ccff00]">
                {plan.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-4 py-2 text-[11px] font-bold transition ${
                activeTab === "saved"
                  ? "bg-white/[0.08] text-white shadow-sm"
                  : "text-white/35 hover:text-white"
              }`}
            >
              Saved
              <span className="ml-2 text-[#ccff00]">
                {saved.length}
              </span>
            </button>

          </div>


          {/* SORT */}
          <div className="flex items-center gap-2">

            <span className="text-[10px] text-white/30">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="rounded-lg border border-white/[0.08] bg-[#111419] px-3 py-2 text-[11px] font-bold text-white outline-none transition focus:border-[#ccff00]/40"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

          </div>

        </div>


        {/* =====================================
            WORKOUT LIST
        ===================================== */}
        <div className="mt-4 space-y-3">

          {sortedItems.length > 0 ? (
            sortedItems.map((workout) => (
              <WorkoutRow
                key={workout?.id}
                workout={workout}
                activeTab={activeTab}
                isCompleted={completed.includes(
                  workout?.id
                )}
                onDone={handleDone}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <EmptyState
              activeTab={activeTab}
            />
          )}

        </div>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}
      <footer className="border-t border-white/[0.06] bg-[#0b0d10]">

        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

          <div className="flex items-center gap-2">

            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#ccff00] text-[11px] font-black text-black">
              ⚡
            </div>

            <span className="text-[11px] font-black tracking-wide">
              FITLOG
            </span>

          </div>

          <p className="text-[9px] text-white/30 sm:text-right">
            © 2026 FitLog — Workout Library.
            Train hard, log honest.
          </p>

        </div>

      </footer>


      {/* =========================================
          TOAST
      ========================================= */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">

          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#111419]/90 px-5 py-3 shadow-2xl shadow-black/50 backdrop-blur-2xl">

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
              ✓
            </span>

            <span className="whitespace-nowrap text-xs font-bold text-white">
              {toast}
            </span>

          </div>

        </div>
      )}

    </main>
  );
};


// =====================================================
// WORKOUT ROW
// =====================================================

const WorkoutRow = ({
  workout,
  activeTab,
  isCompleted,
  onDone,
  onRemove,
}) => {

  const calories =
    workout?.caloriesBurned ??
    workout?.calories ??
    0;

  const category = Array.isArray(
    workout?.category
  )
    ? workout.category[0]
    : workout?.category || "Workout";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-3 transition duration-300 sm:p-4 ${
        isCompleted
          ? "border-[#ccff00]/20 bg-[#ccff00]/[0.035]"
          : "border-white/[0.07] bg-white/[0.035] hover:border-white/[0.13] hover:bg-white/[0.05]"
      } backdrop-blur-xl`}
    >

      {/* subtle glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#ccff00]/[0.025] blur-3xl transition group-hover:bg-[#ccff00]/[0.06]" />


      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">

        {/* ===================================
            IMAGE
        =================================== */}
        <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 sm:h-[72px] sm:w-[100px]">

          {workout?.image ? (
            <img
              src={workout.image}
              alt={workout?.name || "Workout"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-white/20">
              No Image
            </div>
          )}

        </div>


        {/* ===================================
            INFORMATION
        =================================== */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <h2 className="truncate text-sm font-black uppercase text-white sm:text-base">
              {workout?.name || "Untitled Workout"}
            </h2>

            {isCompleted && (
              <span className="rounded-full bg-[#ccff00]/10 px-2 py-1 text-[8px] font-black uppercase tracking-wide text-[#ccff00]">
                Completed
              </span>
            )}

          </div>


          <p className="mt-1 text-[10px] text-white/35">
            {category}
          </p>


          {/* META */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-white/45">

            <span className="flex items-center gap-1">
              <span className="text-[#ccff00]">◷</span>
              {workout?.duration || 0} min
            </span>

            <span className="flex items-center gap-1">
              <span className="text-[#ccff00]">♨</span>
              {calories} kcal
            </span>

            <span className="flex items-center gap-1">
              <span className="text-[#ccff00]">☆</span>
              {workout?.rating ?? "-"}
            </span>

          </div>

        </div>


        {/* ===================================
            ACTIONS
        =================================== */}
        <div className="flex shrink-0 items-center gap-2">

          {/* VIEW */}
          <Link
            href={`/workout/${workout?.id}`}
            className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[9px] font-bold text-white/60 transition hover:border-white/20 hover:text-white"
          >
            View Details
          </Link>


          {/* DONE */}
          {activeTab === "plan" && (
            <button
              onClick={() =>
                onDone(workout?.id)
              }
              disabled={isCompleted}
              className={`rounded-full px-4 py-2 text-[9px] font-black transition ${
                isCompleted
                  ? "cursor-default bg-[#ccff00]/10 text-[#ccff00]/50"
                  : "bg-[#ccff00] text-black hover:bg-[#dcff45]"
              }`}
            >
              {isCompleted
                ? "✓ Done"
                : "✓ Mark as Done"}
            </button>
          )}


          {/* REMOVE */}
          {activeTab === "plan" && (
            <button
              onClick={() =>
                onRemove(workout?.id)
              }
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/25 transition hover:bg-red-500/10 hover:text-red-400"
              aria-label="Remove workout"
            >
              ×
            </button>
          )}

        </div>

      </div>

    </div>
  );
};


// =====================================================
// EMPTY STATE
// =====================================================

const EmptyState = ({ activeTab }) => {

  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.025] px-6 py-16 text-center backdrop-blur-xl">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/[0.06] text-xl text-[#ccff00]">
        {activeTab === "plan" ? "＋" : "♡"}
      </div>

      <h2 className="mt-5 text-sm font-black uppercase">
        {activeTab === "plan"
          ? "Your plan is empty"
          : "No saved workouts"}
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-white/35">
        {activeTab === "plan"
          ? "Browse the workout library and add exercises to today's plan."
          : "Save workouts you want to come back to later."}
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase text-black transition hover:bg-[#ddff4d]"
      >
        Browse Workouts
      </Link>

    </div>
  );
};

export default MyPlanPage;