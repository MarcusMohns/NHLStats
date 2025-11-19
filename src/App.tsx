import MainContent from "./mainContent/MainContent.tsx";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import useDarkmode from "./hooks/useDarkMode.ts";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkmode();

  return (
    <div className={`${isDarkMode ? "dark" : ""} dark:bg-stone-900`}>
      <Navbar darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
