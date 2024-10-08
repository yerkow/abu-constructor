import { FileArchive } from "lucide-react";
import { ListItem } from "./ListItem";
import { backendImageUrl } from "@/shared/lib/constants";
import Link from "next/link";
interface ListItem {
  file: string;
  content: string;
}
export interface ListProps {
  items: ListItem[];
}
function List({
  contents,
  options: { content },
  locale,
}: {
  contents: Array<any>;
  options: any;
  locale: string;
}) {
  return (
    <section className="flex flex-col gap-4  h-full">
      <h2 className="text-2xl font-bold text-[#690000]">
        {content?.[locale]?.title.toLocaleUpperCase()}
      </h2>
      <ul className="h-auto">
        {contents.map(({ content }, idx) => (
          <ListItem
            key={idx}
            icon={<FileArchive />}
            href={`${backendImageUrl}${content.image}`}
          >
            <div>{content[locale].title}</div>
          </ListItem>
        ))}
      </ul>
    </section>
  );
}

List.displayName = "List";
export default List;
