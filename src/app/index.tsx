import { AppDispatch, RootState } from "@/redux/store";
import { checkAuthState } from "@/redux/apiSlice";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function RootScreen(): JSX.Element | null {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.api);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  if (isLoading) return null;

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return <Redirect href="/home" />;
}

export default RootScreen;
