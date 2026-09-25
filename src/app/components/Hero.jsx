import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#080808]">

      <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10">

        <div className="relative z-10">

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#CCFF00]">
            Workout Library
          </p>

          <h1 className="max-w-2xl text-5xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion:
            pick a lift, lock it into today&apos;s plan,
            and watch the week&apos;s work add up.
          </p>

          <Link
            href="#workouts"
            className="mt-8 inline-flex rounded-full bg-[#CCFF00] px-7 py-4 text-sm font-black uppercase text-black transition hover:bg-[#d9ff3f]"
          >
            Browse Workouts
          </Link>

        </div>


        <div className="relative flex min-h-[400px] items-center justify-center">

          <div className="absolute h-72 w-72 rounded-full bg-[#CCFF00]/10 blur-3xl" />

          <img
            src="/Image/banner.png"
            alt="Workout"
            className="relative z-10 max-h-[500px] w-full object-contain"
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;