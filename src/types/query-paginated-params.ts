export type ParamsWithPaginationType<T = unknown> = T & {
  page?: number;
  perPage?: number;
};