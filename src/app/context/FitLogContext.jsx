"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FitLogContext = createContext(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export const FitLogProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  const [mounted, setMounted] = useState(false);


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    try {
      const storedPlan =
        localStorage.getItem(PLAN_KEY);

      const storedSaved =
        localStorage.getItem(SAVED_KEY);

      if (storedPlan) {
        const parsedPlan =
          JSON.parse(storedPlan);

        if (Array.isArray(parsedPlan)) {
          setPlan(parsedPlan);
        }
      }

      if (storedSaved) {
        const parsedSaved =
          JSON.parse(storedSaved);

        if (Array.isArray(parsedSaved)) {
          setSaved(parsedSaved);
        }
      }
    } catch (error) {
      console.error(
        "FitLog localStorage error:",
        error
      );
    }

    setMounted(true);
  }, []);


  // ==========================================
  // SAVE PLAN
  // ==========================================

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      PLAN_KEY,
      JSON.stringify(plan)
    );
  }, [plan, mounted]);


  // ==========================================
  // SAVE SAVED WORKOUTS
  // ==========================================

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify(saved)
    );
  }, [saved, mounted]);


  // ==========================================
  // ADD TO PLAN
  // ==========================================

  const addToPlan = (workout) => {
    if (!workout?.id) return;

    // Don't allow if already saved
    const alreadySaved = saved.some(
      (item) =>
        String(item?.id) ===
        String(workout.id)
    );

    if (alreadySaved) {
      return;
    }

    setPlan((currentPlan) => {

      // Don't allow duplicate plan item
      const alreadyInPlan =
        currentPlan.some(
          (item) =>
            String(item?.id) ===
            String(workout.id)
        );

      if (alreadyInPlan) {
        return currentPlan;
      }

      // Maximum 5 workouts
      if (currentPlan.length >= 5) {
        return currentPlan;
      }

      return [
        ...currentPlan,
        workout,
      ];
    });
  };


  // ==========================================
  // REMOVE FROM PLAN
  // ==========================================

  const removeFromPlan = (workoutId) => {
    if (!workoutId) return;

    setPlan((currentPlan) =>
      currentPlan.filter(
        (item) =>
          String(item?.id) !==
          String(workoutId)
      )
    );
  };


  // ==========================================
  // MARK AS DONE
  // ==========================================

  const markAsDone = (workoutId) => {
    if (!workoutId) return;

    setPlan((currentPlan) =>
      currentPlan.filter(
        (item) =>
          String(item?.id) !==
          String(workoutId)
      )
    );
  };


  // ==========================================
  // SAVE WORKOUT
  // ==========================================

  const saveWorkout = (workout) => {
    if (!workout?.id) return;

    // Don't allow if already in today's plan
    const alreadyInPlan = plan.some(
      (item) =>
        String(item?.id) ===
        String(workout.id)
    );

    if (alreadyInPlan) {
      return;
    }

    setSaved((currentSaved) => {

      // Don't allow duplicate saved item
      const alreadySaved =
        currentSaved.some(
          (item) =>
            String(item?.id) ===
            String(workout.id)
        );

      if (alreadySaved) {
        return currentSaved;
      }

      return [
        ...currentSaved,
        workout,
      ];
    });
  };


  // ==========================================
  // REMOVE SAVED WORKOUT
  // ==========================================

  const removeSavedWorkout = (workoutId) => {
    if (!workoutId) return;

    setSaved((currentSaved) =>
      currentSaved.filter(
        (item) =>
          String(item?.id) !==
          String(workoutId)
      )
    );
  };


  // ==========================================
  // CHECK PLAN
  // ==========================================

  const isInPlan = (workoutId) => {
    if (!workoutId) return false;

    return plan.some(
      (item) =>
        String(item?.id) ===
        String(workoutId)
    );
  };


  // ==========================================
  // CHECK SAVED
  // ==========================================

  const isSaved = (workoutId) => {
    if (!workoutId) return false;

    return saved.some(
      (item) =>
        String(item?.id) ===
        String(workoutId)
    );
  };


  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,

        addToPlan,
        removeFromPlan,
        markAsDone,

        saveWorkout,
        removeSavedWorkout,

        isInPlan,
        isSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};


// ==========================================
// CUSTOM HOOK
// ==========================================

export const useFitLog = () => {
  const context =
    useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
};