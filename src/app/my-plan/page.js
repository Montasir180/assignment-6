"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useFitLog } from "@/app/context/FitLogContext";

const MyPlanPage = () => {
  const {
    plan,
    removeFromPlan,
    markAsDone,
  } = useFitLog();

  const [sortBy, setSortBy] = useState("duration");

 

  const totalExercises = plan.length;

  const totalMinutes = useMemo(() => {
    return plan.reduce((total, workout) => {
      return total + Number(workout?.duration || 0);
    }, 0);
  }, [plan]);

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
      return items.sort(
        (a, b) =>
          Number(b?.rating || 0) -
          Number(a?.rating || 0)
      );
    }

    return items;
  }, [plan, sortBy]);

  

  if (plan.length === 0) {
    return (
      <main className="min-h-screen bg-[#08090b] px-5 py-10 text-white sm:px-8 lg:px-10 lg:py-14">

        <div className="mx-auto max-w-6xl">

         
          <div className="mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
              Today's Workout
            </p>

            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
              My Plan
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              Your workout plan is empty. Add some workouts
              from the library and start training.
            </p>
          </div>

        
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl sm:p-16">

            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#CCFF00]/10 blur-3xl" />

            <div className="relative">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#CCFF00]/20 bg-[#CCFF00]/10 text-3xl">
                🏋️
              </div>

              <h2 className="mt-6 text-2xl font-black uppercase">
                Your plan is empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
                Explore the workout library and add exercises
                to your plan.
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex rounded-xl bg-[#CCFF00] px-6 py-3 text-sm font-black uppercase text-black transition hover:scale-[1.03]"
              >
                Browse Workouts
              </Link>

            </div>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090b] px-5 py-10 text-white sm:px-8 lg:px-10 lg:py-14">

      <div className="mx-auto max-w-6xl">

       

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
              Today's Workout
            </p>

            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
              My Plan
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Cap of five lifts for today. Finish them,
              then load more.
            </p>

          </div>

        
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-right backdrop-blur-xl">

            <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
              Today
            </p>

            <p className="mt-1 text-lg font-black">
              <span className="text-[#CCFF00]">
                {totalExercises}
              </span>
              /5 workouts
            </p>

          </div>

        </div>


       

        <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">

          
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#CCFF00]/5 blur-3xl" />

          <div className="relative grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

           
            <div className="p-6 sm:p-7">

              <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                Exercises
              </p>

              <p className="mt-3 text-4xl font-black text-[#CCFF00]">
                {totalExercises}
              </p>

            </div>

            <div className="p-6 sm:p-7">

              <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                Minutes
              </p>

              <p className="mt-3 text-4xl font-black">
                {totalMinutes}
              </p>

            </div>
            <div className="p-6 sm:p-7">

              <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                Calories
              </p>

              <p className="mt-3 text-4xl font-black">
                {totalCalories}
              </p>

            </div>

          </div>

        </div>



        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">

            <button
              className="rounded-lg bg-white/10 px-4 py-2 text-xs font-bold text-white"
            >
              Today's Plan
              <span className="ml-2 text-[#CCFF00]">
                {totalExercises}
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
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-white outline-none backdrop-blur-xl"
            >
              <option
                value="duration"
                className="bg-[#111317]"
              >
                Duration
              </option>

              <option
                value="calories"
                className="bg-[#111317]"
              >
                Calories
              </option>

              <option
                value="rating"
                className="bg-[#111317]"
              >
                Rating
              </option>
            </select>

          </div>

        </div>


        

        <div className="mt-5 space-y-4">

          {sortedPlan.map((workout) => {

            const calories =
              workout?.caloriesBurned ??
              workout?.calories ??
              0;

            return (
              <div
                key={workout.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] sm:p-5"
              >

               
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#CCFF00]/5 blur-3xl transition group-hover:bg-[#CCFF00]/10" />


                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                 

                  <div className="flex min-w-0 items-center gap-4">

                   
                    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/20 sm:h-24 sm:w-28">

                      {workout?.image ? (
                        <img
                          src={workout.image}
                          alt={
                            workout.name ||
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


                   
                    <div className="min-w-0">

                      <h2 className="truncate text-lg font-black uppercase sm:text-xl">
                        {workout?.name ||
                          "Workout"}
                      </h2>

                      <p className="mt-1 text-xs text-white/30">
                        {workout?.equipment ||
                          "Workout"}
                      </p>


                      
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/50">

                        <span className="flex items-center gap-1">
                          <span className="text-[#CCFF00]">
                            ◷
                          </span>

                          {workout?.duration || 0} min
                        </span>


                      
                        <span className="flex items-center gap-1">
                          <span className="text-orange-400">
                            ♨
                          </span>

                          {calories} kcal
                        </span>


                       
                        <span className="flex items-center gap-1">
                          <span className="text-[#CCFF00]">
                            ★
                          </span>

                          {workout?.rating ?? "-"}
                        </span>

                      </div>

                    </div>

                  </div>


                

                  <div className="flex shrink-0 items-center gap-2">

               
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs font-bold text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                      View Details
                    </Link>


                    <button
                      onClick={() =>
                        markAsDone(workout.id)
                      }
                      className="rounded-xl bg-[#CCFF00] px-4 py-3 text-xs font-black text-black transition hover:scale-[1.02] hover:bg-[#d9ff3f]"
                    >
                      ✓ Mark as Done
                    </button>

                    <button
                      onClick={() =>
                        removeFromPlan(workout.id)
                      }
                      title="Remove from plan"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/30 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                    >
                      ×
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>


   

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#CCFF00]/10 bg-[#CCFF00]/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-bold">
              Keep going.
            </p>

            <p className="mt-1 text-xs text-white/30">
              Complete your workouts and build your streak.
            </p>

          </div>

          <Link
            href="/"
            className="w-fit rounded-xl border border-[#CCFF00]/20 px-5 py-3 text-xs font-black uppercase text-[#CCFF00] transition hover:bg-[#CCFF00]/10"
          >
            Add More Workouts
          </Link>

        </div>

      </div>

    </main>
  );
};

export default MyPlanPage;