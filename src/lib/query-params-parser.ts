type QueryParams = Record<string, string | number | boolean | unknown>;

function queryParamsParser(queryParams?: QueryParams): Record<string, string> {
  if (!queryParams) return {};

  return Object.fromEntries(
    Object.entries(queryParams).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value];
      }

      if (typeof value === "boolean") {
        return [key, value ? "true" : "false"];
      }

      return [key, String(value)];
    })
  );
}

export default queryParamsParser;
