"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext(null);

export const FitLogProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);



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
  }, []);



  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);



  const addToPlan = (workout) => {
    if (!workout?.id) return;

    setPlan((currentPlan) => {
      const exists = currentPlan.some(
        (item) => item?.id === workout.id
      );

      if (exists) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  };



  const removeFromPlan = (id) => {
    setPlan((currentPlan) =>
      currentPlan.filter((item) => item?.id !== id)
    );
  };



  const markAsDone = (id) => {
    setPlan((currentPlan) =>
      currentPlan.filter((item) => item?.id !== id)
    );
  };



  const saveWorkout = (workout) => {
    if (!workout?.id) return;

    setSaved((currentSaved) => {
      const exists = currentSaved.some(
        (item) => item?.id === workout.id
      );

      if (exists) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  };



  const removeSavedWorkout = (id) => {
    setSaved((currentSaved) =>
      currentSaved.filter((item) => item?.id !== id)
    );
  };

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