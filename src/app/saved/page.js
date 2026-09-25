"use client";

import Link from "next/link";
import { useFitLog } from "@/app/context/FitLogContext";

const SavedPage = () => {
  const {
    saved,
    removeSavedWorkout,
  } = useFitLog();

  

  const totalCalories = saved.reduce(
    (total, workout) =>
      total + Number(workout?.caloriesBurned || workout?.calories || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#08090b] px-5 py-10 text-white sm:px-8 lg:px-10 lg:py-14">

      <div className="mx-auto max-w-7xl">

     
     

        <div className="mb-10">

          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Saved Workouts
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Your saved workouts are ready whenever you are.
          </p>

        </div>




        <div className="mb-10 grid gap-4 md:grid-cols-3">

          {/* SAVED */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

            <p className="text-xs font-bold uppercase tracking-widest text-white/35">
              Saved Workouts
            </p>

            <p className="mt-4 text-4xl font-black text-white">
              {saved.length}
            </p>

          </div>



          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

            <p className="text-xs font-bold uppercase tracking-widest text-white/35">
              Total Calories
            </p>

            <p className="mt-4 text-4xl font-black text-[#CCFF00]">
              {totalCalories}
            </p>

          </div>


          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

            <p className="text-xs font-bold uppercase tracking-widest text-white/35">
              Status
            </p>

            <p className="mt-4 text-4xl font-black text-[#CCFF00]">
              {saved.length > 0 ? "READY" : "EMPTY"}
            </p>

          </div>

        </div>



        {saved.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center backdrop-blur-xl">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#CCFF00]/10 text-2xl">
              ♡
            </div>

            <h2 className="text-2xl font-black uppercase">
              No Saved Workouts
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
              Save workouts from the library and they will appear here.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-full bg-[#CCFF00] px-7 py-3 text-xs font-black uppercase text-black transition hover:bg-[#d9ff3f]"
            >
              Browse Workouts
            </Link>

          </div>
        )}




        {saved.length > 0 && (
          <div className="space-y-5">

            {saved.map((workout) => {

              const calories =
                workout?.caloriesBurned ??
                workout?.calories ??
                0;

              return (
                <div
                  key={workout.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl transition duration-300 hover:border-[#CCFF00]/20 hover:bg-white/[0.05] sm:p-5"
                >

               
               

                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#CCFF00]/5 blur-3xl transition group-hover:bg-[#CCFF00]/10" />


                  <div className="relative flex flex-col gap-5 md:flex-row md:items-center">

              
              

                    <div className="h-28 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30 md:h-28 md:w-44">

                      <img
                        src={workout.image}
                        alt={workout.name || "Workout"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                    </div>




                    <div className="min-w-0 flex-1">

                      <h2 className="text-xl font-black uppercase tracking-tight">
                        {workout.name}
                      </h2>

                      <p className="mt-1 text-sm text-white/35">
                        {workout.equipment || "Workout"}
                      </p>


                   

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/45">

                        <span>
                          ◷ {workout.duration || 0} min
                        </span>

                        <span>
                          🔥 {calories} kcal
                        </span>

                        <span className="text-[#CCFF00]">
                          ★ {workout.rating || "-"}
                        </span>

                      </div>

                    </div>


               

                    <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">

                  

                      <Link
                        href={`/workout/${workout.id}`}
                        className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-xs font-black uppercase text-white/70 transition hover:border-white/25 hover:text-white"
                      >
                        View Details →
                      </Link>


                    

                      <button
                        onClick={() =>
                          removeSavedWorkout(workout.id)
                        }
                        className="inline-flex items-center justify-center rounded-full border border-red-400/20 bg-red-400/[0.04] px-5 py-3 text-xs font-black uppercase text-red-400 transition hover:border-red-400/40 hover:bg-red-400/10"
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

      </div>

    </main>
  );
};

export default SavedPage;