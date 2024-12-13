import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "@/hooks/use-session";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useSession();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex space-x-4">
        <a href="/login" className="text-gray-700 hover:text-gray-900">
          Login
        </a>
        <a href="/register" className="text-gray-700 hover:text-gray-900">
          Register
        </a>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center h-8 w-8 rounded-full bg-muted hover:bg-muted/80 focus:outline-none ring-2 ring-primary/80 focus:ring-primary"
        aria-label="User Profile"
      >
        <img src="/vite.svg" alt="logo" className="h-8 w-8 rounded-full" />
      </button>

      {/* Animate dropdown with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-300 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <DropdownOption text="My Profile" onClick={() => setIsOpen(false)} />
            <DropdownOption text="Settings" onClick={() => setIsOpen(false)} />
            <DropdownOption text="Logout" onClick={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownOption = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <div
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export { UserDropdown };
