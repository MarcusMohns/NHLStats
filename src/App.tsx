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
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    localStorage.setItem("darkMode", JSON.stringify(newDarkModeState));
    startViewTransitionWrapper(() => setIsDarkMode(newDarkModeState));
  };

  return (
    <div className={`main-content ${isDarkMode ? "dark" : ""}`}>
      <Navbar darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
