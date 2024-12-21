import { PropsWithChildren, useEffect } from "react";
import { AuthContext } from "./auth-context";
import {
  useAuthLogoutMutate,
  useAuthMeQuery,
} from "@/queries/auth";
import useAuthStore from "./auth-store";

export default function AuthProvider({ children }: PropsWithChildren) {
  const { data, isPending } = useAuthMeQuery();
  const { setUser, user, token } = useAuthStore();
  const { mutateAsync: logout, isPending: isLogoutPending } = useAuthLogoutMutate();

  useEffect(() => {
    if (data && !isPending) {
      setUser(data.data.data);
    }
  }, [data, isPending, setUser]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        logout,
        userPending: isPending,
        logoutPending: isLogoutPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
