import { ParamsWithPaginationType } from "@/types/query-paginated-params";

function transformPaginationParams({
  page,
  perPage,
}: ParamsWithPaginationType) {
  const transformed: Record<string, string | number> = {};

  if (page) {
    transformed["page[number]"] = page;
  }

  if (perPage) {
    transformed["page[size]"] = perPage;
  }

  return transformed;
}

export default transformPaginationParams;
