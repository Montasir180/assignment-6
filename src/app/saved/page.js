"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useFitLog } from "@/app/context/FitLogContext";

const SavedPage = () => {
  const { saved, removeFromSaved } = useFitLog();

  // Total calories
  const totalCalories = useMemo(() => {
    return saved.reduce((total, workout) => {
      return (
        total +
        Number(
          workout?.caloriesBurned ??
            workout?.calories ??
            0
        )
      );
    }, 0);
  }, [saved]);

  return (
    <main className="min-h-screen bg-[#08090b] px-5 py-10 text-white sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-6xl">

        {/* =========================
            HEADER
        ========================== */}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
              Your Collection
            </p>

            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Saved Workouts
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              Keep your favorite workouts here and come back
              whenever you're ready to train.
            </p>
          </div>

          {/* SAVED COUNT */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
              Saved Workouts
            </p>

            <p className="mt-1 text-lg font-black">
              <span className="text-[#CCFF00]">
                {saved.length}
              </span>{" "}
              workouts
            </p>
          </div>
        </div>


        {/* =========================
            STATS
        ========================== */}

        <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">

          {/* Glass Glow */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#CCFF00]/5 blur-3xl" />

          <div className="relative grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">

            {/* SAVED */}

            <div className="p-6 sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                Saved
              </p>

              <p className="mt-3 text-4xl font-black text-[#CCFF00]">
                {saved.length}
              </p>
            </div>


            {/* CALORIES */}

            <div className="p-6 sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                Total Calories
              </p>

              <p className="mt-3 text-4xl font-black">
                {totalCalories}
              </p>
            </div>

          </div>
        </div>


        {/* =========================
            TABS
        ========================== */}

        <div className="mt-7">
          <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">

            {/* TODAY'S PLAN */}

            <Link
              href="/my-plan"
              className="rounded-lg px-4 py-2 text-xs font-bold text-white/40 transition hover:bg-white/5 hover:text-white"
            >
              Today's Plan
            </Link>


            {/* SAVED */}

            <button
              type="button"
              className="rounded-lg bg-white/10 px-4 py-2 text-xs font-bold text-white"
            >
              Saved

              <span className="ml-2 text-[#CCFF00]">
                {saved.length}
              </span>
            </button>

          </div>
        </div>


        {/* =========================
            EMPTY STATE
        ========================== */}

        {saved.length === 0 && (
          <div className="relative mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl sm:p-16">

            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-[#CCFF00]/10 blur-3xl" />

            <div className="relative">

              {/* ICON */}

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#CCFF00]/20 bg-[#CCFF00]/10 text-3xl">
                ♡
              </div>


              <h2 className="mt-6 text-2xl font-black uppercase">
                No Saved Workouts
              </h2>


              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
                You haven't saved any workouts yet.
                Browse the library and save your favorite
                workouts for later.
              </p>


              <Link
                href="/"
                className="mt-7 inline-flex rounded-xl bg-[#CCFF00] px-6 py-3 text-sm font-black uppercase text-black transition hover:scale-[1.03] hover:bg-[#d9ff3f]"
              >
                Browse Workouts
              </Link>

            </div>
          </div>
        )}


        {/* =========================
            SAVED WORKOUTS
        ========================== */}

        {saved.length > 0 && (
          <div className="mt-5 space-y-4">

            {saved.map((workout) => {

              const calories =
                workout?.caloriesBurned ??
                workout?.calories ??
                0;

              return (
                <div
                  key={workout.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] sm:p-5"
                >

                  {/* GLASS GLOW */}

                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#CCFF00]/5 blur-3xl transition duration-500 group-hover:bg-[#CCFF00]/10" />


                  <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* =========================
                        WORKOUT INFO
                    ========================== */}

                    <div className="flex min-w-0 items-center gap-4">

                      {/* IMAGE */}

                      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/20 sm:h-24 sm:w-32">

                        {workout?.image ? (
                          <img
                            src={workout.image}
                            alt={
                              workout?.name ||
                              "Workout"
                            }
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-white/30">
                            No Image
                          </div>
                        )}

                      </div>


                      {/* TEXT */}

                      <div className="min-w-0">

                        <h2 className="truncate text-lg font-black uppercase sm:text-xl">
                          {workout?.name ||
                            "Workout"}
                        </h2>


                        <p className="mt-1 text-xs text-white/30">
                          {workout?.equipment ||
                            "Workout"}
                        </p>


                        {/* META */}

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/50">

                          {/* DURATION */}

                          <span className="flex items-center gap-1">
                            <span className="text-[#CCFF00]">
                              ◷
                            </span>

                            {workout?.duration || 0} min
                          </span>


                          {/* CALORIES */}

                          <span className="flex items-center gap-1">
                            <span className="text-orange-400">
                              ♨
                            </span>

                            {calories} kcal
                          </span>


                          {/* RATING */}

                          <span className="flex items-center gap-1">
                            <span className="text-[#CCFF00]">
                              ★
                            </span>

                            {workout?.rating ?? "-"}
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* =========================
                        BUTTONS
                    ========================== */}

                    <div className="flex flex-wrap items-center gap-2">

                      {/* VIEW DETAILS */}

                      <Link
                        href={`/workout/${workout.id}`}
                        className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs font-bold text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                      >
                        View Details
                      </Link>


                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          removeFromSaved(workout.id)
                        }
                        className="rounded-xl border border-red-500/20 bg-red-500/[0.03] px-4 py-3 text-xs font-black uppercase text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}


        {/* =========================
            BOTTOM CTA
        ========================== */}

        {saved.length > 0 && (
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#CCFF00]/10 bg-[#CCFF00]/[0.03] p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-bold">
                Ready for your next workout?
              </p>

              <p className="mt-1 text-xs text-white/30">
                Add a saved workout to your plan when
                you're ready to train.
              </p>
            </div>


            <Link
              href="/"
              className="w-fit rounded-xl border border-[#CCFF00]/20 px-5 py-3 text-xs font-black uppercase text-[#CCFF00] transition hover:bg-[#CCFF00]/10"
            >
              Browse More
            </Link>

          </div>
        )}

      </div>
    </main>
  );
};

export default SavedPage;