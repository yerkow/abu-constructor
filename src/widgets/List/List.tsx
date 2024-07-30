"use client";
import { cn } from "@/shared/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui";
import { FileArchive } from "lucide-react";
import { useState } from "react";
import { ListItem } from "./ListItem";
import { backendImageUrl } from "@/shared/lib/constants";
interface ListItem {
  file: string;
  content: string;
}
interface ListProps {
  items: ListItem[];
  // files?: boolean;
}
export const List = ({ items: listItems }: ListProps) => {
  const [current, setCurrent] = useState(1);
  const pagination =
    listItems.length > 5 ? paginate(listItems.length, 5, current) : null;
  const handleNext = () => {
    if (pagination) {
      setCurrent((prev) => {
        if (prev >= pagination?.totalPages) {
          return 1;
        } else {
          return prev + 1;
        }
      });
    }
  };

  const handlePrev = () => {
    if (pagination) {
      setCurrent((prev) => {
        if (prev <= 1) {
          return pagination.totalPages;
        } else {
          return prev - 1;
        }
      });
    }
  };

  return (
    <section className="flex flex-col gap-4  h-full">
      <ul className="h-auto">
        {listItems
          .slice((current - 1) * 5, (current - 1) * 5 + 5)
          .map((list, idx) => (
            <ListItem
              key={idx}
              icon={<FileArchive />}
              href={`${backendImageUrl}${list.file}`}
            >
              {list.content}
            </ListItem>
          ))}
      </ul>
      {listItems.length > 5 && pagination && (
        <Pagination>
          <PaginationContent>
            <PaginationItem onClick={handlePrev}>
              <PaginationPrevious />
            </PaginationItem>

            {new Array(pagination.totalPages).fill("*").map((_, idx) => (
              <>
                {current + 1 !== pagination.totalPages &&
                  idx + 1 == pagination.totalPages && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                <PaginationItem
                  className={cn(
                    idx + 1 == current ||
                      (current == 1 && idx + 1 == 3) ||
                      idx + 1 == current + 1 ||
                      idx + 1 == current - 1 ||
                      idx + 1 == pagination.totalPages
                      ? "block"
                      : "hidden",
                    idx + 1 == 1 &&
                      (current == pagination.totalPages - 1 ||
                        current == pagination.totalPages) &&
                      "block",
                  )}
                  onClick={() => setCurrent(idx + 1)}
                >
                  <PaginationLink isActive={idx + 1 == current}>
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
                {idx + 1 == 1 && current == pagination.totalPages - 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            ))}

            <PaginationItem onClick={handleNext}>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};
function paginate(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Ensure current page isn't out of range
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  // Create an array of page numbers for the pagination controls
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return {
    totalItems,
    itemsPerPage,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    pages,
  };
}
