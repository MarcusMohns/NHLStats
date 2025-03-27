import MainContent from "./NhlContent/MainContent.tsx";
import { useState } from "react";
function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className={`${darkMode && "dark"} flex justify-center align-center`}>
      {/* <Navbar /> */}
      <button
        onClick={() => setDarkMode((prevState) => !prevState)}
        className="h-12 w-12 bg-slate-400"
      >
        Toggle dark mode
      </button>
      <MainContent />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
