export default function Loading() {
return ( <main className="flex min-h-[70vh] items-center justify-center bg-[#08090b] text-white">


  <div className="text-center">

    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#ccff00]" />

    <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
      Loading workouts…
    </p>

  </div>

</main>


);
}
