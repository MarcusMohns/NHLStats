import MainContent from "./mainContent/MainContent.tsx";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import { useState } from "react";
import startViewTransitionWrapper from "./utility/startViewTransitionWrapper.ts";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize dark mode state based on localStorage or system preference
    const storedDarkMode = localStorage.getItem("darkMode");
    // If theres a stored boolean for dark mode use it
    if (storedDarkMode) return true;
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      // Try to use the system preference
      return true;
    // Default to light mode
    else return false;
  });

  // Toggle dark mode and persist the preference in localStorage
  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    localStorage.setItem("darkMode", JSON.stringify(newDarkModeState));
    startViewTransitionWrapper(() => setIsDarkMode(newDarkModeState));
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} dark:bg-stone-900`}>
      <Navbar darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
