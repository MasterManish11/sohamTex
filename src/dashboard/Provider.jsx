'use client';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { usePathname } from 'next/navigation';

const Context = createContext({});

export function DashboardProvider({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Set the html tag overflow to hidden
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
  }, []);

  // Close sidebar on route changes
  useEffect(() => {
    return () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
  }, [isOpen, pathname]);

  return (
    <Context.Provider value={{ isOpen, openSidebar, closeSidebar }}>
      {children}
    </Context.Provider>
  );
}

// Custom hook to consume all context values { isOpen, openSidebar, closeSidebar }
export function useDashboardContext() {
  return useContext(Context);
}
