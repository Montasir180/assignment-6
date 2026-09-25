"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const Library = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const result = await response.json();

        // Handle different possible API response shapes
        const data =
          Array.isArray(result)
            ? result
            : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.workouts)
            ? result.workouts
            : [];

        setWorkouts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load workouts.");
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section
      id="workouts"
      className="bg-[#080808] px-5 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CCFF00]">
              Library
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase text-white sm:text-4xl">
              Choose Your Workout
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/40">
            Pick a workout, inspect the details, and add it
            to your plan.
          </p>

        </div>


        {/* LOADING */}
        {loading && (
          <div className="flex min-h-60 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-[#CCFF00]" />
          </div>
        )}


        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center text-red-400">
            {error}
          </div>
        )}


        {/* EMPTY */}
        {!loading && !error && workouts.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-white/40">
            No workouts found.
          </div>
        )}


        {/* CARDS */}
        {!loading && !error && workouts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Library;