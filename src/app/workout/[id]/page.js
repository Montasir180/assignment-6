import Link from "next/link";
import WorkoutActions from "@/app/components/WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const getWorkout = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    if (result?.workout) {
      return result.workout;
    }

    return result;
  } catch (error) {
    console.error("Workout fetch error:", error);
    return null;
  }
};

const WorkoutDetails = async ({ params }) => {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#08090a] px-5 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase">
            Workout Not Found
          </h1>

          <p className="mt-3 text-white/40">
            We could not find this workout.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black"
          >
            ← Back To Library
          </Link>
        </div>
      </main>
    );
  }

  const categories = Array.isArray(workout.category)
    ? workout.category
    : workout.category
    ? [workout.category]
    : [];

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : [];

  return (
    <main className="min-h-screen bg-[#08090a] px-4 py-8 text-white sm:px-6 lg:px-10 lg:py-12">

      <div className="mx-auto max-w-7xl">

        {/* BACK BUTTON */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/40 transition hover:text-[#ccff00]"
        >
          <span className="text-base">←</span>
          Back To Library
        </Link>

        {/* MAIN GLASS CONTAINER */}
        <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/40 backdrop-blur-xl">

          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">

            {/* ================================================= */}
            {/* LEFT - IMAGE */}
            {/* ================================================= */}

            <div className="relative min-h-[420px] overflow-hidden border-b border-white/[0.08] lg:min-h-[700px] lg:border-b-0 lg:border-r">

              {/* Glow */}
              <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ccff00]/10 blur-[100px]" />

              {/* Top glass line */}
              <div className="absolute left-6 right-6 top-6 z-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Image */}
              <div className="relative flex h-full min-h-[420px] items-center justify-center p-6 sm:p-10 lg:min-h-[700px]">

                <div className="absolute inset-8 rounded-[24px] border border-white/[0.05] bg-black/20" />

                <img
                  src={workout.image}
                  alt={workout.name || "Workout"}
                  className="relative z-10 max-h-[620px] w-full rounded-2xl object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
                />
              </div>

              {/* Image bottom label */}
              <div className="absolute bottom-6 left-6 z-20 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 backdrop-blur-md">
                FitLog Workout
              </div>
            </div>


            {/* ================================================= */}
            {/* RIGHT - DETAILS */}
            {/* ================================================= */}

            <div className="flex flex-col p-6 sm:p-8 lg:p-10 xl:p-12">

              {/* CATEGORY */}
              <div className="mb-5 flex flex-wrap gap-2">
                {categories.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#ccff00]"
                  >
                    {item}
                  </span>
                ))}
              </div>


              {/* TITLE */}
              <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-7xl">
                {workout.name}
              </h1>


              {/* DESCRIPTION */}
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
                {workout.description}
              </p>


              {/* ============================================== */}
              {/* STATS */}
              {/* ============================================== */}

              <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md">

                <div className="grid grid-cols-2 sm:grid-cols-3">

                  <Info
                    label="Equipment"
                    value={workout.equipment}
                  />

                  <Info
                    label="Difficulty"
                    value={workout.difficulty}
                  />

                  <Info
                    label="Sets"
                    value={workout.sets}
                  />

                  <Info
                    label="Reps"
                    value={workout.reps}
                  />

                  <Info
                    label="Duration"
                    value={
                      workout.duration != null
                        ? `${workout.duration} min`
                        : "-"
                    }
                  />

                  <Info
                    label="Calories"
                    value={
                      workout.caloriesBurned != null
                        ? `${workout.caloriesBurned} kcal`
                        : "-"
                    }
                  />

                </div>
              </div>


              {/* ============================================== */}
              {/* RATING */}
              {/* ============================================== */}

              {workout.rating != null && (
                <div className="mt-5 flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]">
                    ★
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                      Community Rating
                    </p>

                    <p className="mt-0.5 text-sm font-black text-[#ccff00]">
                      {workout.rating} / 5.0
                    </p>
                  </div>

                </div>
              )}


              {/* ============================================== */}
              {/* INSTRUCTIONS */}
              {/* ============================================== */}

              {instructions.length > 0 && (
                <div className="mt-8">

                  <div className="mb-4 flex items-center justify-between">

                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                      Instructions
                    </h2>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/25">
                      {instructions.length} Steps
                    </span>

                  </div>


                  <div className="space-y-2.5">

                    {instructions.map((instruction, index) => (
                      <div
                        key={index}
                        className="group flex gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition duration-300 hover:border-[#ccff00]/20 hover:bg-[#ccff00]/[0.025]"
                      >

                        {/* NUMBER */}
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 text-[11px] font-black text-[#ccff00] transition group-hover:bg-[#ccff00] group-hover:text-black">
                          {index + 1}
                        </div>

                        {/* TEXT */}
                        <p className="text-xs leading-6 text-white/50 sm:text-sm">
                          {instruction}
                        </p>

                      </div>
                    ))}

                  </div>
                </div>
              )}


              {/* ============================================== */}
              {/* ACTION BUTTONS */}
              {/* ============================================== */}

              <div className="mt-auto pt-8">
                <WorkoutActions workout={workout} />
              </div>

            </div>
          </div>
        </div>


        {/* BOTTOM MINI INFO */}
        <div className="mt-5 flex flex-col gap-2 px-1 text-[10px] font-bold uppercase tracking-wider text-white/20 sm:flex-row sm:items-center sm:justify-between">

          <span>
            FitLog • Train with intent
          </span>

          <span>
            Log every set.
          </span>

        </div>

      </div>
    </main>
  );
};


/* ========================================================= */
/* REUSABLE INFO COMPONENT */
/* ========================================================= */

const Info = ({ label, value }) => {
  return (
    <div className="group border-b border-r border-white/[0.07] p-4 transition hover:bg-white/[0.025] sm:p-5">

      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/25">
        {label}
      </p>

      <p className="mt-2 truncate text-sm font-bold text-white sm:text-[15px]">
        {value ?? "-"}
      </p>

    </div>
  );
};

export default WorkoutDetails;