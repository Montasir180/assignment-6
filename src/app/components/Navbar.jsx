"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/app/context/FitLogContext";

const Navbar = () => {
  const pathname = usePathname();

  const { plan, saved } = useFitLog();

  const planCount = plan?.length || 0;
  const savedCount = saved?.length || 0;

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#08090b]/90 backdrop-blur-xl">

      <div className="navbar mx-auto min-h-[72px] max-w-7xl px-4 sm:px-6 lg:px-8">

        
        <div className="navbar-start">

          
          <div className="dropdown">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mr-2 lg:hidden"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-4 w-56 rounded-2xl border border-white/10 bg-[#111419] p-3 shadow-2xl"
            >

              <li>
                <Link
                  href="/"
                  className={isActive("/") ? "text-[#ccff00]" : ""}
                >
                  Workouts
                </Link>
              </li>

              <li>
                <Link
                  href="/my-plan"
                  className={
                    isActive("/my-plan")
                      ? "text-[#ccff00]"
                      : ""
                  }
                >
                  My Plan

                  {planCount > 0 && (
                    <span className="badge badge-sm border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]">
                      {planCount}
                    </span>
                  )}
                </Link>
              </li>

              <li>
                <Link href="/saved">
                  Saved

                  {savedCount > 0 && (
                    <span className="badge badge-sm border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]">
                      {savedCount}
                    </span>
                  )}
                </Link>
              </li>

            </ul>

          </div>


          <Link
            href="/"
            className="group flex items-center gap-2"
          >

            <img
              src="/Image/logo.png"
              alt="FitLog Logo"
              className="h-10 w-10 object-contain transition duration-300 group-hover:scale-105"
            />

            <div className="hidden sm:block">
              <h1 className="text-lg font-black tracking-tight">
                FIT<span className="text-[#ccff00]">LOG</span>
              </h1>

              <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
                Train. Log. Repeat.
              </p>
            </div>

          </Link>

        </div>


        <div className="navbar-center hidden lg:flex">

          <nav className="flex items-center gap-2">

            <NavLink
              href="/"
              active={isActive("/")}
            >
              Workouts
            </NavLink>

            <NavLink
              href="/my-plan"
              active={isActive("/my-plan")}
            >
              My Plan
            </NavLink>

          </nav>

        </div>


        <div className="navbar-end">

          <div className="hidden items-center gap-2 sm:flex">

            {/* PLAN */}
            <Link
              href="/my-plan"
              className={`group flex items-center gap-2 rounded-full border px-3 py-2 transition ${
                isActive("/my-plan")
                  ? "border-[#ccff00]/30 bg-[#ccff00]/10"
                  : "border-white/10 bg-white/[0.025] hover:border-[#ccff00]/20"
              }`}
            >

              <span className="text-[9px] font-black uppercase tracking-wide text-white/35">
                Plan
              </span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[9px] font-black text-black">
                {planCount}
              </span>

            </Link>


            <Link
              href="/saved"
              className={`group flex items-center gap-2 rounded-full border px-3 py-2 transition ${
                isActive("/saved")
                  ? "border-[#ccff00]/30 bg-[#ccff00]/10"
                  : "border-white/10 bg-white/[0.025] hover:border-[#ccff00]/20"
              }`}
            >

              <span className="text-[9px] font-black uppercase tracking-wide text-white/35">
                Saved
              </span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 text-[9px] font-black text-white/70">
                {savedCount}
              </span>

            </Link>

          </div>

        </div>

      </div>

    </header>
  );
};




const NavLink = ({ href, active, children }) => {
  return (
    <Link
      href={href}
      className={`relative rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wide transition ${
        active
          ? "bg-[#ccff00] text-black"
          : "text-white/45 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;