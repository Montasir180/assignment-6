"use client";

import Link from "next/link";
import { useState } from "react";
import { useFitLog } from "@/app/context/FitLogContext";

const MyPlan = () => {
  const {
    plan,
    saved,
    removeFromPlan,
    removeSaved,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState("plan");

  const currentList =
    activeTab === "plan"
      ? plan
      : saved;

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-10 text-white sm:px-8 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CCFF00]">
            Your Training
          </p>

          <h1 className="mt-2 text-4xl font-black uppercase sm:text-5xl">
            My Plan
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
            Manage your planned workouts and saved workouts
            from one place.
          </p>

        </div>


        {/* TABS */}
        <div className="mb-8 flex gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">

          <button
            onClick={() => setActiveTab("plan")}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-black uppercase transition ${
              activeTab === "plan"
                ? "bg-[#CCFF00] text-black"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            Today's Plan ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-black uppercase transition ${
              activeTab === "saved"
                ? "bg-[#CCFF00] text-black"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>

        </div>


        {/* EMPTY */}
        {currentList.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">

            <h2 className="text-2xl font-black uppercase">
              Nothing Here Yet
            </h2>

            <p className="mt-3 text-sm text-white/40">
              {activeTab === "plan"
                ? "Add workouts to your today's plan."
                : "Save workouts to see them here."}
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-[#CCFF00] px-6 py-3 text-sm font-black uppercase text-black"
            >
              Browse Workouts
            </Link>

          </div>
        )}


        {/* WORKOUTS */}
        {currentList.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {currentList.map((workout) => (
              <div
                key={workout.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
              >

                <div className="h-56 bg-white/[0.02]">

                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-full w-full object-contain p-6"
                  />

                </div>


                <div className="p-5">

                  <h2 className="text-xl font-black uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/40">
                    {workout.description}
                  </p>


                  <div className="mt-5 flex gap-2">

                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-center text-xs font-black uppercase text-white hover:border-[#CCFF00]/40 hover:text-[#CCFF00]"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeSaved(workout.id)
                      }
                      className="rounded-xl border border-red-500/20 px-4 py-3 text-xs font-black uppercase text-red-400 hover:bg-red-500/10"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
};

export default MyPlan;