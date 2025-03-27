import MainContent from "./NhlContent/MainContent.tsx";
import { useState } from "react";
function App() {
  const darkThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState<boolean>(
    darkThemeMediaQuery.matches
  );
  return (
    <div className={`${darkMode && "dark"}`}>
      {/* <Navbar /> */}
      <button
        onClick={() => setDarkMode((prevState) => !prevState)}
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
