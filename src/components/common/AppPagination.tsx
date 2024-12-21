import { Pagination as ResponsePagination } from "@/types/response-type";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";

type PageType = number | "ellipsis";

interface Props {
  pagination?: ResponsePagination;
  setPage: (page: number) => void;
  page: number;
  range?: number;
}

function AppPagination({ pagination, setPage, page, range = 2 }: Props) {
  if (!pagination) return null;
  if (pagination.lastPage === 1) return null;

  const generatePages = () => {
    const pages: PageType[] = [];

    for (let i = 1; i <= pagination.lastPage; i++) {
      if (
        i === 1 ||
        i === pagination.lastPage ||
        (i >= pagination.currentPage - range &&
          i <= pagination.currentPage + range)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            size="icon"
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {generatePages().map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={index}>
              <Ellipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <Button
                variant="outline"
                disabled={page === item}
                onClick={() => setPage(item)}
                size="icon"
              >
                {item}
              </Button>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <Button
            variant="outline"
            disabled={page === pagination.lastPage}
            onClick={() => setPage(pagination.currentPage + 1)}
            size="icon"
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default AppPagination;
