"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PageRoutes } from "@/constants/routes";
import AppLoader from "@/components/templates/loader/appLoader";
import toast from "react-hot-toast";

const AuthenticatedUser = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const { isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
      // Check authentication status
      if (!isAuthenticated) {
        // Redirect to login page if not logged in
        router.push(PageRoutes.LOGIN);
        toast.error("Login First!");
      }
    }, [router, toast, isAuthenticated]);

    // Render the wrapped component if logged in
    return !isAuthenticated ? <AppLoader /> : <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default AuthenticatedUser;
