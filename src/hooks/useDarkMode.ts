import { useState } from "react";
import startViewTransitionWrapper from "../utility/startViewTransitionWrapper";
const useDarkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize dark mode state based on localStorage or system preference
    const storedDarkMode = localStorage.getItem("Darkmode");
    if (!storedDarkMode) {
      // If no stored preference, check system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false;
    } else {
      const validDarkModes = ["true", "false"];
      // If we have a stored preference, check if it's valid
      if (validDarkModes.includes(storedDarkMode))
        // Return the stored preference
        return JSON.parse(storedDarkMode);
      // Default to false (light mode)
      else return false;
    }
  });

  // Toggle dark mode and persist the preference in localStorage
  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    localStorage.setItem("Darkmode", JSON.stringify(newDarkModeState));
    startViewTransitionWrapper(() => setIsDarkMode(newDarkModeState));
  };
  return { isDarkMode, toggleDarkMode };
};

export default useDarkmode;
