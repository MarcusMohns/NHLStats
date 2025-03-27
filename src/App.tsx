import MainContent from "./NhlContent/MainContent.tsx";
import { useState } from "react";
function App() {
  const darkThemeMediaQuery = localStorage.getItem("darkMode")
    ? JSON.parse(localStorage.getItem("darkMode") as string)
    : window.matchMedia("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState<boolean>(
    darkThemeMediaQuery.matches
  );
  const handleDarkModeChange = () => {
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    setDarkMode((prevState) => !prevState);
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      {/* <Navbar /> */}
      <button
        onClick={handleDarkModeChange}
        className="h-12 w-12 bg-green-500 rounded-full"
      >
        Toggle dark mode
      </button>
      <MainContent />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
