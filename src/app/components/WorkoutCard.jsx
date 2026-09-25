"use client";

import Link from "next/link";

const WorkoutCard = ({ workout }) => {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div
        className="
          group
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-white/[0.05]
          backdrop-blur-xl
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-lime-400/40
          hover:shadow-[0_15px_40px_rgba(163,230,53,0.12)]
          cursor-pointer
        "
      >

        <div className="relative h-52 overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

      
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>


       
        <div className="p-5">

          <div className="mb-4 flex items-center gap-2">
            <span className="badge badge-sm border-none bg-lime-400 font-bold text-black">
              {workout.category || "BACK"}
            </span>

            <span className="badge badge-sm border-none bg-lime-400 font-bold text-black">
              {workout.muscle || "ARMS"}
            </span>
          </div>


     
          <h2 className="text-xl font-black uppercase tracking-wide text-white">
            {workout.name}
          </h2>


          <p className="mt-1 text-sm text-gray-400">
            {workout.equipment || "Pull-up Bar"}
          </p>


  
          <div className="my-4 h-px bg-white/10" />


   
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">

            
            <div className="flex items-center gap-1.5">
              <span>◷</span>
              <span>{workout.duration || "15 min"}</span>
            </div>


        
            <div className="flex items-center gap-1.5">
              <span>♟</span>
              <span>{workout.calories || "120 kcal"}</span>
            </div>


   
            <div className="flex items-center gap-1.5">
              <span>☆</span>
              <span>{workout.rating || "4.7"}</span>
            </div>

          </div>

        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;