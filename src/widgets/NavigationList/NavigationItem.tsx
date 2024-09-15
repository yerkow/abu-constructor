"use client";
import { useParams } from "next/navigation";

import { NavigationControl } from "./ui/NavigationControl";
import { NavigationChildren } from "./ui/NavigationChildren";

import { handleDragEnd } from "./lib";

import { useDragAndDrop } from "@/shared/lib/hooks/useDrag&Drop";
import { INavigation } from "@/shared/lib/types";
import { INavigationItemProps } from "./model/types";

export const NavigationItem = ({
  item,
  onDragEnd,
  handler,
}: INavigationItemProps) => {
  const locale = useParams().locale as string;
  const { navigation_type } = item;
  const { handleDragStart, handleDrop } = useDragAndDrop<INavigation>(
    onDragEnd || handleDragEnd
  );

  if (navigation_type === "detail") return;

  return (
    <li
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      onDrop={(e: React.DragEvent<HTMLLIElement>) =>
        handleDrop(e, item, handler)
      }
      onDragOver={(e) => e.preventDefault()}
      className={"p-4 border border-gray-200 rounded-md flex flex-col gap-2"}
    >
      <NavigationControl item={item} locale={locale} />
      <NavigationChildren
        handleDragEnd={handleDragEnd}
        handleDrop={handleDrop}
        handler={handler}
        item={item}
      />
    </li>
  );
};
