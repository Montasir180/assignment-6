"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FitLogContext = createContext(null);

export const FitLogProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState(null);
  const [hydrated, setHydrated] = useState(false);

 
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error("Local storage loading error:", error);
    }

    setHydrated(true);
  }, []);


  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, hydrated]);


  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, hydrated]);


  const showToast = (message, type = "success") => {
    setToast({
      id: Date.now(),
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };


  const addToPlan = (workout) => {
    if (!workout?.id) return;

    const alreadyInPlan = plan.some(
      (item) => item?.id === workout.id
    );

    const alreadySaved = saved.some(
      (item) => item?.id === workout.id
    );


    if (alreadyInPlan) {
      showToast(
        `${workout.name} is already in today's plan.`,
        "info"
      );
      return;
    }


    if (alreadySaved) {
      showToast(
        `${workout.name} is already saved. Remove it from Saved first.`,
        "error"
      );
      return;
    }

    setPlan((previous) => [
      ...previous,
      workout,
    ]);

    showToast(
      `${workout.name} added to today's plan.`,
      "success"
    );
  };


  const removeFromPlan = (id) => {
    const workout = plan.find(
      (item) => item?.id === id
    );

    setPlan((previous) =>
      previous.filter(
        (item) => item?.id !== id
      )
    );

    if (workout) {
      showToast(
        `${workout.name} removed from today's plan.`,
        "success"
      );
    }
  };


  const markAsDone = (id) => {
    const workout = plan.find(
      (item) => item?.id === id
    );

    setPlan((previous) =>
      previous.filter(
        (item) => item?.id !== id
      )
    );

    if (workout) {
      showToast(
        `${workout.name} completed!`,
        "success"
      );
    }
  };


  const saveWorkout = (workout) => {
    if (!workout?.id) return;

    const alreadySaved = saved.some(
      (item) => item?.id === workout.id
    );

    const alreadyInPlan = plan.some(
      (item) => item?.id === workout.id
    );

   
    if (alreadySaved) {
      showToast(
        `${workout.name} is already saved.`,
        "info"
      );
      return;
    }


    if (alreadyInPlan) {
      showToast(
        `${workout.name} is already in today's plan. Remove it first.`,
        "error"
      );
      return;
    }

    setSaved((previous) => [
      ...previous,
      workout,
    ]);

    showToast(
      `${workout.name} saved for later.`,
      "success"
    );
  };

  
  const removeFromSaved = (id) => {
    const workout = saved.find(
      (item) => item?.id === id
    );

    setSaved((previous) =>
      previous.filter(
        (item) => item?.id !== id
      )
    );

    if (workout) {
      showToast(
        `${workout.name} removed from saved.`,
        "success"
      );
    }
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,

        addToPlan,
        removeFromPlan,

        saveWorkout,
        removeFromSaved,

        markAsDone,

        showToast,
      }}
    >
      {children}

     
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <div
            className={`min-w-[280px] max-w-[380px] rounded-xl border px-5 py-4 shadow-2xl backdrop-blur-xl ${
              toast.type === "error"
                ? "border-red-500/30 bg-red-500/10"
                : toast.type === "info"
                ? "border-white/10 bg-white/10"
                : "border-[#CCFF00]/30 bg-[#CCFF00]/10"
            }`}
          >
            <div className="flex items-start gap-3">

              <div
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                  toast.type === "error"
                    ? "bg-red-500 text-white"
                    : toast.type === "info"
                    ? "bg-white/20 text-white"
                    : "bg-[#CCFF00] text-black"
                }`}
              >
                {toast.type === "error"
                  ? "!"
                  : toast.type === "info"
                  ? "i"
                  : "✓"}
              </div>

              <p className="text-sm font-medium leading-6 text-white">
                {toast.message}
              </p>

            </div>
          </div>
        </div>
      )}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
};