"use client";
import { createContext, useState } from "react";

export const ParentContext = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <ParentContext.Provider value={{ user, setUser }}>
      {children}
    </ParentContext.Provider>
  );
};
