"use client";
import ReactPaginate from "react-paginate";
const itemsPerPage = 5;
interface PaginationProps {
  pageCount: number;
  totalItems: number;
  current: number;
  changeCurrent: (item: number) => void;
}
export const Pagination = ({
  current,
  changeCurrent,
  pageCount,
  totalItems,
}: PaginationProps) => {
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = current + itemsPerPage;

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % totalItems;
    changeCurrent(newOffset);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
