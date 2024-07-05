import { Button } from "@/shared/ui";
import { DeleteIcon } from "lucide-react";
const deletePage = (id: number) => {
  let pages = localStorage.getItem("pages");
  if (pages) {
    pages = JSON.parse(pages);
    if (Array.isArray(pages)) {
      pages = pages.filter((page) => page.id !== id);
    }
    localStorage.setItem("pages", JSON.stringify(pages));
  } else {
    localStorage.setItem("pages", JSON.stringify([]));
  }
};
export const DeletePageBtn = ({ id }: { id: number }) => {
  return (
    <Button size={"icon"} onClick={() => deletePage(id)}>
      <DeleteIcon />
    </Button>
  );
};
