import { getRazorpayApiKeyApi } from "@/api/order";
import { LoadUserApi } from "@/api/user";
import AppLoader from "@/components/templates/loader/appLoader";
import { loadUser } from "@/redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const [letEnter, setLetEnter] = useState(false);

  const {
    data: userLoadData,
    isLoading: userLoading,
    error: userLoadError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: LoadUserApi,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !authChecked,
  });

  useEffect(() => {
    if (userLoadData || userLoadError) setAuthChecked(true);
    if (userLoadData) {
      dispatch(loadUser(userLoadData.data?.user));
      setLetEnter(true);
    }
    if (userLoadError) {
      setLetEnter(true);
    }
  }, [authChecked, userLoadData, userLoadError, dispatch]);

  return letEnter ? children : <AppLoader />;
};
