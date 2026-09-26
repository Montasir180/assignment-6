"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext();

export const FitLogProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  const [toast, setToast] = useState(null);


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
      console.error("Local storage error:", error);
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

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

    const alreadyExists = plan.some(
      (item) => item?.id === workout.id
    );

    if (alreadyExists) {
      showToast("Workout is already in today's plan", "info");
      return;
    }

    if (plan.length >= 5) {
      showToast("Today's plan is limited to 5 workouts", "error");
      return;
    }

    setPlan((prev) => [...prev, workout]);

    showToast(
      `${workout.name || "Workout"} added to today's plan`,
      "success"
    );
  };


  const removeFromPlan = (id) => {
    const workout = plan.find(
      (item) => item?.id === id
    );

    setPlan((prev) =>
      prev.filter((item) => item?.id !== id)
    );

    showToast(
      `${workout?.name || "Workout"} removed from today's plan`,
      "delete"
    );
  };


  const markAsDone = (id) => {
    const workout = plan.find(
      (item) => item?.id === id
    );

    setPlan((prev) =>
      prev.filter((item) => item?.id !== id)
    );

    showToast(
      `${workout?.name || "Workout"} completed!`,
      "success"
    );
  };


  const saveWorkout = (workout) => {
    if (!workout?.id) return;

    const alreadySaved = saved.some(
      (item) => item?.id === workout.id
    );

    if (alreadySaved) {
      showToast("Workout is already saved", "info");
      return;
    }

    setSaved((prev) => [...prev, workout]);

    showToast(
      `${workout.name || "Workout"} saved for later`,
      "save"
    );
  };


  const removeFromSaved = (id) => {
    const workout = saved.find(
      (item) => item?.id === id
    );

    setSaved((prev) =>
      prev.filter((item) => item?.id !== id)
    );

    showToast(
      `${workout?.name || "Workout"} removed from saved`,
      "delete"
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
        removeFromSaved,

        toast,
        showToast,
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