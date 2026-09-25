"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext(null);

export const FitLogProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  const [mounted, setMounted] = useState(false);

  // Load data from localStorage
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
      console.error("Failed to load FitLog data:", error);
    }

    setMounted(true);
  }, []);

  // Save plan
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, mounted]);

  // Save saved workouts
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, mounted]);

  // =========================
  // ADD TO PLAN
  // =========================

  const addToPlan = (workout) => {
    if (!workout?.id) return false;

    const alreadyExists = plan.some(
      (item) => item?.id === workout.id
    );

    if (alreadyExists) {
      return false;
    }

    if (plan.length >= 5) {
      return false;
    }

    setPlan((previous) => [...previous, workout]);

    return true;
  };

  // =========================
  // REMOVE FROM PLAN
  // =========================

  const removeFromPlan = (id) => {
    setPlan((previous) =>
      previous.filter((item) => item?.id !== id)
    );
  };

  // =========================
  // SAVE WORKOUT
  // =========================

  const saveWorkout = (workout) => {
    if (!workout?.id) return false;

    const alreadySaved = saved.some(
      (item) => item?.id === workout.id
    );

    if (alreadySaved) {
      return false;
    }

    setSaved((previous) => [...previous, workout]);

    return true;
  };

  // =========================
  // REMOVE SAVED
  // =========================

  const removeSaved = (id) => {
    setSaved((previous) =>
      previous.filter((item) => item?.id !== id)
    );
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        mounted,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
      }}
    >
      {children}
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