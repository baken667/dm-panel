import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import queryParamsParser from "@/lib/query-params-parser";
import transformPaginationParams from "@/lib/transform-pagination-params";
import {
  ProfileUpdateSchemaType,
  UserCreateSchemaType,
  UserUpdateSchemaType,
} from "@/schema/user";
import { ParamsWithPaginationType } from "@/types/query-paginated-params";
import { QueryParamsType } from "@/types/query-params";
import { Response, ResponseList } from "@/types/response-type";
import { User } from "@/types/user-type";
import queryClient from "@/lib/queryClient";

export const USER_KEY = "user";
export const USERS_KEY = ["users"];
export const USER_CREATE_KEY = ["users", "create"];
export const USER_UPDATE_KEY = ["users", "update"];
export const USER_DELETE = ["users", "delete"];

type UsersListParams = ParamsWithPaginationType<{
  queryParams?: QueryParamsType;
}>;

export function useUsersListQuery({
  page,
  perPage,
  queryParams,
}: UsersListParams) {
  return useQuery({
    queryKey: [...USERS_KEY, { page, perPage, queryParams }],
    queryFn: () =>
      api<ResponseList<User>>({
        method: "GET",
        url: "api/v1/users",
        params: {
          ...transformPaginationParams({ page, perPage }),
          ...queryParamsParser(queryParams),
        },
      }),
  });
}

export function useUserQuery(id: number) {
  return useQuery({
    queryKey: [USER_KEY, id],
    queryFn: () =>
      api<Response<User>>({
        method: "GET",
        url: `api/v1/users/${id}`,
      }),
  });
}

export function useUserUpdateMutation() {
  return useMutation({
    mutationKey: [USER_UPDATE_KEY],
    mutationFn: (data: {
      id: number;
      data: ProfileUpdateSchemaType | UserUpdateSchemaType;
    }) =>
      api<Response<User>>({
        method: "POST",
        url: `api/v1/users/${data.id}`,
        data: data.data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USERS_KEY,
      });
    },
  });
}

export function useUserCreateMutation() {
  return useMutation({
    mutationKey: [USER_CREATE_KEY],
    mutationFn: (data: UserCreateSchemaType) =>
      api<Response<User>>({
        method: "POST",
        url: "api/v1/users",
        data,
      }),
  });
}

export function useUserDeleteMutation() {
  return useMutation({
    mutationKey: [USER_DELETE],
    mutationFn: (id: number) =>
      api({
        method: "POST",
        url: `api/v1/users/${id}/delete`,
      }),
  });
}
