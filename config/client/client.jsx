"use client";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const ParentContext = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <ParentContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <>
          {children}
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </>
      </QueryClientProvider>
    </ParentContext.Provider>
  );
};
