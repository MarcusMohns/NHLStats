const Footer = () => {
  return (
    <footer
      className="min-h-[250px] w-full flex items-center justify-center 
    bg-gray-100 dark:bg-stone-800 text-center p-5 font-bold"
      aria-label="Footer with creator information"
    >
      <p className="text-sm font-bold leading-tight tracking-wide text-stone-700 dark:text-stone-200">
        Made by Marcus Mohns using React, TypeScript & Tailwindcss - 2025
      </p>
    </footer>
  );
};

export default Footer;
