import Link from "next/link";
import WorkoutActions from "@/app/components/WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const getWorkout = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result = await response.json();

    if (result?.data) return result.data;
    if (result?.workout) return result.workout;

    return result;
  } catch (error) {
    console.error("Workout fetch error:", error);
    return null;
  }
};

const InfoRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 last:border-b-0">
      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/35">
        {label}
      </span>

      <span className="text-[11px] font-semibold text-white/80">
        {value ?? "-"}
      </span>
    </div>
  );
};

const WorkoutDetails = async ({ params }) => {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0d10] px-5 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase">
            Workout Not Found
          </h1>

          <p className="mt-3 text-sm text-white/40">
            We could not find this workout.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-lg bg-[#c8ff00] px-6 py-3 text-xs font-black uppercase text-black"
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

  const calories =
    workout.caloriesBurned ??
    workout.calories ??
    null;

  return (
    <main className="min-h-screen bg-[#0b0d10] text-white">

  
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10">

       
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-white/35 transition hover:text-[#c8ff00]"
        >
          ← Back To Library
        </Link>


   
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(400px,0.95fr)]">



          <div className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#111419]">

     
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8ff00]/10 blur-[100px]" />

            <div className="relative flex min-h-[420px] items-center justify-center sm:min-h-[500px] lg:min-h-[560px]">

              <img
                src={workout.image}
                alt={workout.name || "Workout"}
                className="relative z-10 h-full max-h-[560px] w-full object-contain transition duration-500 group-hover:scale-[1.015]"
              />

            </div>

          </div>


        
          <div className="flex flex-col justify-center">

        
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-full bg-[#c8ff00] px-3 py-1 text-[9px] font-black uppercase tracking-wide text-black"
                >
                  {item}
                </span>
              ))}
            </div>


           
            <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-5xl">
              {workout.name}
            </h1>


           
            <p className="mt-4 max-w-2xl text-xs leading-5 text-white/45 sm:text-sm">
              {workout.description}
            </p>


            <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111419]/80 shadow-2xl shadow-black/20 backdrop-blur-xl">

              <InfoRow
                label="Equipment"
                value={workout.equipment}
              />

              <InfoRow
                label="Difficulty"
                value={workout.difficulty}
              />

              <InfoRow
                label="Sets"
                value={workout.sets}
              />

              <InfoRow
                label="Reps"
                value={workout.reps}
              />

              <InfoRow
                label="Duration"
                value={
                  workout.duration
                    ? `${workout.duration} min`
                    : "-"
                }
              />

              <InfoRow
                label="Calories"
                value={
                  calories !== null
                    ? `${calories} kcal`
                    : "-"
                }
              />

              <InfoRow
                label="Rating"
                value={
                  workout.rating
                    ? `${workout.rating}`
                    : "-"
                }
              />

            </div>


            {instructions.length > 0 && (
              <div className="mt-7">

                <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.18em]">
                  Instructions
                </h2>

                <div className="space-y-2">

                  {instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c8ff00] text-[9px] font-black text-black">
                        {index + 1}
                      </span>

                      <p className="pt-0.5 text-[10px] leading-4 text-white/45 sm:text-[11px]">
                        {instruction}
                      </p>

                    </div>
                  ))}

                </div>

              </div>
            )}


        
            <div className="mt-7">
              <WorkoutActions workout={workout} />
            </div>

          </div>

        </div>

      </div>


     
      <footer className="mt-8 border-t border-white/[0.06]">

        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-5 py-5 sm:flex-row sm:items-center sm:px-8 lg:px-10">

          <div className="flex items-center gap-2">

            <span className="text-[#c8ff00]">⌁</span>

            <span className="text-[9px] font-black uppercase tracking-wide">
              FITLOG
            </span>

          </div>

          <p className="text-[8px] text-white/25">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>

        </div>

      </footer>

    </main>
  );
};

export default WorkoutDetails;