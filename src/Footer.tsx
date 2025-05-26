const Footer = () => {
  return (
    <footer
      className="min-h-[250px] w-full flex items-center justify-center 
    border-t-2 border-gray-100 dark:border-stone-800 text-center p-5"
      aria-label="Footer with creator information"
    >
      <p className="text-xs font-bold text-stone-700 dark:text-stone-200">
        Made by Marcus Mohns using React, TypeScript & Tailwindcss 2025 - Thanks
        to{" "}
        <a
          className="text-blue-600 dark:text-blue-400 hover:underline"
          href="https://github.com/Zmalski/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Zmalski
        </a>{" "}
        for the{" "}
        <a
          className="text-blue-600 dark:text-blue-400 hover:underline"
          href="https://github.com/Zmalski/NHL-API-Reference"
          target="_blank"
          rel="noopener noreferrer"
        >
          unofficial NHL API documentation
        </a>
      </p>
    </footer>
  );
};

export default Footer;
