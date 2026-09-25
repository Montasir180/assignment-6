
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0b0d10]">
      <div className="mx-auto flex min-h-[72px] max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 sm:flex-row sm:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <img
            src="/Image/logo.png"
            alt="FitLog"
            className="h-6 w-6 object-contain"
          />

          <span className="text-xs font-black tracking-wide text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* CENTER */}
        <p className="text-center text-[10px] text-white/30 sm:text-xs">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-white/30">
          <Link
            href="/"
            className="transition hover:text-[#ccff00]"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="transition hover:text-[#ccff00]"
          >
            My Plan
          </Link>

          <Link
            href="/saved"
            className="transition hover:text-[#ccff00]"
          >
            Saved
          </Link>
        </div>

      </div>
    </footer>
  );
};


export default Footer;