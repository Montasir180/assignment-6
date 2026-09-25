"use client";

import Link from "next/link";
import { useFitLog } from "@/app/context/FitLogContext";

const Navbar = () => {
  const { plan, saved } = useFitLog();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#11151a]/95 backdrop-blur-xl">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* LEFT */}
        <div className="navbar-start">

          {/* Mobile menu */}
          <div className="dropdown lg:hidden">

            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-2xl border border-white/10 bg-[#11151a] p-3 shadow-2xl"
            >
              <li>
                <Link href="/">
                  Workouts
                </Link>
              </li>

              <li>
                <Link href="/my-plan">
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <img
              src="/Image/logo.png"
              alt="FitLog Logo"
              className="h-10 w-10 object-contain"
            />

            <span className="hidden text-xl font-black tracking-tight text-white sm:block">
              FITLOG
            </span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-2">

            <li>
              <Link
                href="/"
                className="font-semibold text-white/70 hover:text-[#CCFF00]"
              >
                Workouts
              </Link>
            </li>

            <li>
              <Link
                href="/my-plan"
                className="font-semibold text-white/70 hover:text-[#CCFF00]"
              >
                My Plan
              </Link>
            </li>

          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">

          <div className="flex items-center gap-1 sm:gap-2">

            <Link
              href="/my-plan"
              className="rounded-full px-3 py-2 text-xs font-bold text-white/70 hover:bg-white/5 hover:text-[#CCFF00] sm:px-4 sm:text-sm"
            >
              Plan{" "}
              <span className="rounded-full bg-[#CCFF00] px-2 py-1 text-[10px] font-black text-black">
                {plan.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full px-3 py-2 text-xs font-bold text-white/70 hover:bg-white/5 hover:text-[#CCFF00] sm:px-4 sm:text-sm"
            >
              Saved{" "}
              <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-white">
                {saved.length}
              </span>
            </Link>

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;