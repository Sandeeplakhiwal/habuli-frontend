"use client";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export const ParentContext = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <ParentContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <>
          {children}
          <Toaster position="top-right" reverseOrder="false" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </>
      </QueryClientProvider>
    </ParentContext.Provider>
  );
};
