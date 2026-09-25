"use client";

import Link from "next/link";
import { useFitLog } from "@/app/context/FitLogContext";

export default function SavedPage() {
  const { saved = [] } = useFitLog();

  const totalCalories = saved.reduce(
    (total, workout) =>
      total + Number(workout?.caloriesBurned ?? workout?.calories ?? 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#08090b] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        
        <div className="mb-8">
          <Link
            href="/"
            className="mb-5 inline-flex text-sm font-bold uppercase tracking-wide text-white/40 transition hover:text-[#ccff00]"
          >
            ← Back To Library
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
                Your Collection
              </p>

              <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
                Saved Workouts
              </h1>

              <p className="mt-2 text-sm text-white/40">
                Your saved workouts, ready whenever you need them.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl">
              <span className="text-xs uppercase tracking-wider text-white/40">
                Saved
              </span>

              <p className="text-2xl font-black text-[#ccff00]">
                {saved.length}
              </p>
            </div>
          </div>
        </div>

        
        <div className="mb-8 grid gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">
              Saved Workouts
            </p>

            <p className="mt-2 text-3xl font-black">
              {saved.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">
              Total Calories
            </p>

            <p className="mt-2 text-3xl font-black">
              {totalCalories}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">
              Status
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
              READY
            </p>
          </div>

        </div>

     
        {saved.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] px-6 py-20 text-center backdrop-blur-xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-2xl">
              ♡
            </div>

            <h2 className="text-2xl font-black uppercase">
              No Saved Workouts
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-white/40">
              Save workouts from the library and they will appear here.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:scale-[1.02]"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">

            {saved.map((workout) => (
              <div
                key={workout.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:border-[#ccff00]/20 hover:bg-white/[0.055]"
              >

             
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#ccff00]/5 blur-3xl transition group-hover:bg-[#ccff00]/10" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">

              
                  <div className="h-28 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30 sm:h-24 sm:w-36">
                    {workout.image ? (
                      <img
                        src={workout.image}
                        alt={workout.name || "Workout"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-white/30">
                        NO IMAGE
                      </div>
                    )}
                  </div>

               
                  <div className="min-w-0 flex-1">

                    <div className="mb-2 flex flex-wrap gap-2">
                      {(
                        Array.isArray(workout.category)
                          ? workout.category
                          : workout.category
                            ? [workout.category]
                            : []
                      ).slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-2.5 py-1 text-[9px] font-black uppercase text-[#ccff00]"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <h2 className="truncate text-xl font-black uppercase">
                      {workout.name || "Unnamed Workout"}
                    </h2>

                    <p className="mt-1 text-xs text-white/40">
                      {workout.equipment || "Workout"}
                    </p>

                    
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50">

                      <span>
                        ◷ {workout.duration ?? "-"} min
                      </span>

                      <span>
                        🔥{" "}
                        {workout.caloriesBurned ??
                          workout.calories ??
                          0}{" "}
                        kcal
                      </span>

                      <span>
                        ★ {workout.rating ?? "-"}
                      </span>

                    </div>
                  </div>

              
                  <div className="shrink-0">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#ccff00]/30 hover:bg-[#ccff00] hover:text-black sm:w-auto"
                    >
                      View Details →
                    </Link>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}