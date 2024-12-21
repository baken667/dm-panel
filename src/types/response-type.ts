export type Response<T> = {
  data: T;
  message?: string | null;
  status?: number;
};

export type ResponseList<T> = {
  data: T[];
  pagination?: Pagination;
};

export type Pagination = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};
