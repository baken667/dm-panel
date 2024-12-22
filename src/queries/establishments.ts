import api from "@/lib/api";
import queryParamsParser from "@/lib/query-params-parser";
import transformPaginationParams from "@/lib/transform-pagination-params";
import { CreateEstablishmentSchemaType } from "@/schema/establishment";
import { Establishment } from "@/types/establishment-type";
import { ParamsWithPaginationType } from "@/types/query-paginated-params";
import { QueryParamsType } from "@/types/query-params";
import { Response, ResponseList } from "@/types/response-type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const ESTABLISHMENT_KEY = "establishment";
export const ESTABLISHMENTS_KEY = ["establishments"];
export const ESTABLISHMENT_CREATE_KEY = ["establishments", "create"];

type EstablishmentListParams = ParamsWithPaginationType<{
  queryParams?: QueryParamsType;
}>;

export function useEstablishmentListQuery({
  page,
  perPage,
  queryParams,
}: EstablishmentListParams) {
  return useQuery({
    queryKey: [...ESTABLISHMENTS_KEY, { page, perPage, queryParams }],
    queryFn: () =>
      api<ResponseList<Establishment>>({
        method: "GET",
        url: "api/v1/establishments",
        params: {
          ...transformPaginationParams({ page, perPage }),
          ...queryParamsParser(queryParams),
        },
      }),
  });
}

export function useEstablishmentQuery(id?: number | string) {
  return useQuery({
    queryKey: [ESTABLISHMENT_KEY, id],
    queryFn: () =>
      api<Response<Establishment>>({
        method: "GET",
        url: `api/v1/establishments/${id}`,
      }),
    enabled: !!id,
  });
}

export function useEstablishmentCreateMutation() {
  return useMutation({
    mutationKey: ESTABLISHMENT_CREATE_KEY,
    mutationFn: (data: CreateEstablishmentSchemaType) =>
      api<Response<Establishment>>({
        method: "POST",
        url: "api/v1/establishments",
        data,
      }),
  });
}
