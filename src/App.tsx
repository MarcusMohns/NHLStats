import MainContent from "./mainContent/MainContent.tsx";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import { useState } from "react";
import startViewTransitionWrapper from "./utility/startViewTransitionWrapper.ts";
function App() {
  const darkThemeMediaQuery = localStorage.getItem("darkMode")
    ? localStorage.getItem("darkMode") === "true"
      ? true
      : false
    : window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [darkMode, setDarkMode] = useState<boolean>(darkThemeMediaQuery);
  const handleDarkModeChange = () => {
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    startViewTransitionWrapper(() => setDarkMode((prevState) => !prevState));
  };

  return (
    <div className={`main-content ${darkMode && "dark"}`}>
      <Navbar darkMode={darkMode} handleDarkModeChange={handleDarkModeChange} />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
