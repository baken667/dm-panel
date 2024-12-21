import { useSearchParams } from "react-router";

export function usePaginationPage(defaultPage: number = 1) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "", 10) || defaultPage;

  const setPage = (newPage: number) => {
    if (newPage === defaultPage) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", newPage.toString());
    }

    setSearchParams(searchParams);
  };

  return [page, setPage] as const;
}
