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

  // =========================================
  // LOAD FROM LOCAL STORAGE
  // =========================================

  useEffect(() => {
    try {
      const storedPlan =
        localStorage.getItem("fitlog-plan");

      const storedSaved =
        localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error(
        "FitLog storage error:",
        error
      );
    }
  }, []);


  // =========================================
  // SAVE PLAN
  // =========================================

  useEffect(() => {
    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan]);


  // =========================================
  // SAVE SAVED WORKOUTS
  // =========================================

  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved]);


  // =========================================
  // ADD TO PLAN
  // =========================================

  const addToPlan = (workout) => {

    if (!workout?.id) return;

    setPlan((current) => {

      // Already exists
      if (
        current.some(
          (item) =>
            item?.id === workout.id
        )
      ) {
        return current;
      }

      // Maximum 5
      if (current.length >= 5) {
        return current;
      }

      return [
        ...current,
        workout,
      ];
    });
  };


  // =========================================
  // REMOVE FROM PLAN
  // =========================================

  const removeFromPlan = (id) => {

    setPlan((current) =>
      current.filter(
        (item) =>
          item?.id !== id
      )
    );
  };


  // =========================================
  // SAVE WORKOUT
  // =========================================

  const saveWorkout = (workout) => {

    if (!workout?.id) return;

    setSaved((current) => {

      if (
        current.some(
          (item) =>
            item?.id === workout.id
        )
      ) {
        return current;
      }

      return [
        ...current,
        workout,
      ];
    });
  };


  // =========================================
  // REMOVE SAVED
  // =========================================

  const removeSavedWorkout = (id) => {

    setSaved((current) =>
      current.filter(
        (item) =>
          item?.id !== id
      )
    );
  };


  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,

        addToPlan,
        removeFromPlan,

        saveWorkout,
        removeSavedWorkout,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};


// =========================================
// HOOK
// =========================================

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