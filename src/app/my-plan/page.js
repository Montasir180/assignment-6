"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useFitLog } from "@/app/context/FitLogContext";

export default function MyPlanPage() {
  const {
    plan,
    removeFromPlan,
    markAsDone,
  } = useFitLog();

  const [sortBy, setSortBy] = useState("duration");


  const sortedPlan = useMemo(() => {
    const items = [...plan];

    if (sortBy === "duration") {
      return items.sort(
        (a, b) =>
          Number(a?.duration || 0) -
          Number(b?.duration || 0)
      );
    }

    if (sortBy === "calories") {
      return items.sort(
        (a, b) =>
          Number(b?.caloriesBurned || 0) -
          Number(a?.caloriesBurned || 0)
      );
    }

    if (sortBy === "rating") {
      return items.sort(
        (a, b) =>
          Number(b?.rating || 0) -
          Number(a?.rating || 0)
      );
    }

    return items;
  }, [plan, sortBy]);


  const totalMinutes = useMemo(() => {
    return plan.reduce(
      (total, workout) =>
        total + Number(workout?.duration || 0),
      0
    );
  }, [plan]);

 
  const totalCalories = useMemo(() => {
    return plan.reduce(
      (total, workout) =>
        total +
        Number(workout?.caloriesBurned || 0),
      0
    );
  }, [plan]);

 
  const handleDone = (id) => {
    markAsDone(id);
  };


  const handleRemove = (id) => {
    removeFromPlan(id);
  };

  return (
    <main className="min-h-screen bg-[#08090b] px-4 py-10 text-white sm:px-6 lg:px-10">

      <div className="mx-auto max-w-7xl">

      

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
              My Plan
            </h1>

            <p className="mt-2 text-sm text-white/40 sm:text-base">
              Cap of five lifts for today. Finish them,
              then load more.
            </p>

          </div>

          <div className="text-left md:text-right">

            <p className="text-xs font-bold uppercase tracking-wider text-white/30">
              Today
            </p>

            <p className="mt-1 text-lg font-black">
              {plan.length}/5 workouts
            </p>

          </div>

        </div>



        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl">

          <div className="grid grid-cols-1 sm:grid-cols-3">

          
            <Stat
              label="Exercises"
              value={plan.length}
              accent
            />

        
            <Stat
              label="Minutes"
              value={totalMinutes}
            />

        
            <Stat
              label="Calories"
              value={totalCalories}
              last
            />

          </div>

        </div>




        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

       
          <div className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">

            <button
              className="rounded-lg bg-white/10 px-4 py-2 text-xs font-bold text-white"
            >
              Today's Plan
              <span className="ml-2 text-[#CCFF00]">
                {plan.length}
              </span>
            </button>

            <Link
              href="/saved"
              className="rounded-lg px-4 py-2 text-xs font-bold text-white/40 transition hover:text-white"
            >
              Saved
            </Link>

          </div>


   
          <div className="flex items-center gap-2">

            <span className="text-xs text-white/30">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-white outline-none backdrop-blur-xl"
            >
              <option
                value="duration"
                className="bg-[#111318]"
              >
                Duration
              </option>

              <option
                value="calories"
                className="bg-[#111318]"
              >
                Calories
              </option>

              <option
                value="rating"
                className="bg-[#111318]"
              >
                Rating
              </option>
            </select>

          </div>

        </div>




        {sortedPlan.length === 0 && (

          <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center backdrop-blur-xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CCFF00]/10 text-2xl">
              🏋️
            </div>

            <h2 className="mt-5 text-xl font-black uppercase">
              Your plan is empty
            </h2>

            <p className="mt-2 text-sm text-white/40">
              Add workouts from the library to build
              today's plan.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-[#CCFF00] px-6 py-3 text-xs font-black uppercase text-black transition hover:bg-[#d9ff3f]"
            >
              Browse Workouts
            </Link>

          </div>

        )}




        <div className="mt-6 space-y-3">

          {sortedPlan.map((workout) => (

            <WorkoutRow
              key={workout?.id}
              workout={workout}
              onDone={handleDone}
              onRemove={handleRemove}
            />

          ))}

        </div>

      </div>

    </main>
  );
}




function Stat({
  label,
  value,
  accent = false,
  last = false,
}) {
  return (
    <div
      className={`relative p-6 sm:p-7 ${
        !last
          ? "border-b border-white/10 sm:border-b-0 sm:border-r"
          : ""
      }`}
    >

      <p className="text-[11px] font-bold uppercase tracking-wider text-white/35">
        {label}
      </p>

      <p
        className={`mt-3 text-3xl font-black sm:text-4xl ${
          accent ? "text-[#CCFF00]" : "text-white"
        }`}
      >
        {value}
      </p>

    </div>
  );
}




function WorkoutRow({
  workout,
  onDone,
  onRemove,
}) {
  const image =
    workout?.image ||
    workout?.thumbnail ||
    "/Image/placeholder.png";

  const duration =
    workout?.duration ?? 0;

  const calories =
    workout?.caloriesBurned ?? 0;

  const rating =
    workout?.rating ?? "-";

  const category = Array.isArray(
    workout?.category
  )
    ? workout.category[0]
    : workout?.category || "Workout";

  return (

    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl transition duration-300 hover:border-white/15 hover:bg-white/[0.04] sm:p-5">

      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#CCFF00]/[0.035] blur-3xl transition group-hover:bg-[#CCFF00]/[0.06]" />


      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">


        <div className="flex min-w-0 items-center gap-4">

       

          <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">

            <img
              src={image}
              alt={workout?.name || "Workout"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

          </div>


   

          <div className="min-w-0">

            <h2 className="truncate text-lg font-black uppercase sm:text-xl">
              {workout?.name || "Workout"}
            </h2>

            <p className="mt-1 text-xs text-white/35">
              {category}
            </p>


          

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/45">

              <span className="flex items-center gap-1.5">
                <span className="text-[#CCFF00]">
                  ◷
                </span>
                {duration} min
              </span>


              <span className="flex items-center gap-1.5">
                <span className="text-[#ff6347]">
                  ♨
                </span>
                {calories} kcal
              </span>


              <span className="flex items-center gap-1.5">
                <span className="text-[#CCFF00]">
                  ★
                </span>
                {rating}
              </span>

            </div>

          </div>

        </div>


   

        <div className="flex shrink-0 items-center gap-2">

   

          <Link
            href={`/workout/${workout?.id}`}
            className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold text-white/70 transition hover:border-white/30 hover:text-white"
          >
            View Details
          </Link>


   

          <button
            onClick={() =>
              onDone(workout?.id)
            }
            className="rounded-full bg-[#CCFF00] px-5 py-2.5 text-xs font-black text-black transition hover:bg-[#d9ff3f] active:scale-95"
          >
            ✓ Mark as Done
          </button>


     

          <button
            onClick={() =>
              onRemove(workout?.id)
            }
            aria-label="Remove workout"
            title="Remove from plan"
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-white/25 transition hover:bg-red-500/10 hover:text-red-400"
          >
            ×
          </button>

        </div>

      </div>

    </div>
  );
}