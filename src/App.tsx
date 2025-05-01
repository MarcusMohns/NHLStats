import MainContent from "./mainContent/MainContent.tsx";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import { useState } from "react";
import startViewTransitionWrapper from "./utility/startViewTransitionWrapper.ts";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode
      ? JSON.parse(storedDarkMode)
      : // If theres a stored boolean for dark mode use it
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Otherwise use the system preference
  });

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    localStorage.setItem("darkMode", JSON.stringify(newDarkModeState));
    startViewTransitionWrapper(() => setIsDarkMode(newDarkModeState));
  };

  return (
    <div
      className={`main-content ${isDarkMode ? "dark" : ""}  dark:bg-stone-900 `}
    >
      <Navbar darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
