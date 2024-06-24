import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui";
import { FileArchive } from "lucide-react";
import { useState } from "react";
import { ListItem } from "./ListItem";
interface ListItem {
  href: string;
  content: string;
}
interface ListProps {
  listItems: ListItem[];
  files?: boolean;
}
export function List({ listItems, files }: ListProps) {
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
      <ul className="h-[450px]">
        {listItems
          .slice((current - 1) * 5, (current - 1) * 5 + 5)
          .map((list) => (
            <ListItem icon={files && <FileArchive />} href={list.href}>
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
              <PaginationItem onClick={() => setCurrent(idx + 1)}>
                <PaginationLink isActive={idx + 1 == current}>
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem onClick={handleNext}>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}

function paginate(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
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
