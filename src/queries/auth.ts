import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthLoginSchemaType } from "@/schema/auth";
import useAuthStore from "@/context/auth/auth-store";
import api from "@/lib/api";
import { Response } from "@/types/response-type";
import { User } from "@/types/user-type";

export const AUTH_LOGIN_KEY = ["auth", "login"];
export const AUTH_ME_KEY = ["auth", "me"];
export const AUTH_LOGOUT_KEY = ["auth", "logout"];

export function useAuthLoginMutate() {
  const { setToken } = useAuthStore.getState();
  return useMutation({
    mutationKey: AUTH_LOGIN_KEY,
    mutationFn: (data: AuthLoginSchemaType) =>
      api({
        method: "POST",
        url: "api/v1/auth/login",
        data,
      }),
    onSuccess: (data) => {
      setToken(data.data.data.token);
    },
  });
}

export function useAuthMeQuery() {
  const { token } = useAuthStore.getState();
  return useQuery({
    queryKey: AUTH_ME_KEY,
    queryFn: () =>
      api<Response<User>>({
        method: "GET",
        url: "api/v1/auth/me",
      }),
    enabled: !!token,
    retry: 1,
    retryDelay: 1000,
    refetchInterval: 1000 * 60 * 5,
  });
}

export function useAuthLogoutMutate() {
  const { setToken } = useAuthStore.getState();
  return useMutation({
    mutationKey: AUTH_LOGOUT_KEY,
    mutationFn: () =>
      api({
        method: "POST",
        url: "api/v1/auth/logout",
      }),
    onSuccess: () => {
      setToken(null);
    },
  });
}
