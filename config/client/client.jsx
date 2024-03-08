"use client";
import { createContext, useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast, { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import store from "@/redux/store";
import { LoadUserApi } from "@/api/user";
import { LoadUser } from "@/libs/fetch";
import { loadUser } from "@/redux/slices/userSlice";
import { AuthProvider } from "@/libs/authProvider";
import { getRazorpayApiKeyApi } from "@/api/order";

const queryClient = new QueryClient();

export const ParentContext = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      toast.success("Order placed!");
    }
    if (query.get("canceled")) {
      toast.error(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <ParentContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <>
            {children}
            <Toaster position={"bottom-center"} reverseOrder={false} />
            <ReactQueryDevtools buttonPosition="bottom-left" />
          </>
        </AuthProvider>
      </QueryClientProvider>
    </ParentContext.Provider>
  );
};
