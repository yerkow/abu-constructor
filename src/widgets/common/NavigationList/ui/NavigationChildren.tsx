import React, { DragEvent } from "react";

import { UseMutateFunction } from "@tanstack/react-query";

import { NavigationItem } from "../NavigationItem";

import { INavigation } from "@/shared/lib/types";

export const NavigationChildren = ({
  handleDrop,
  handleDragEnd,
  item,
  handler,
}: {
  handleDrop: (
    e: DragEvent<HTMLDivElement>,
    targetNavItem: any,
    handler: any
  ) => void;
  handleDragEnd: (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
    draggedItem: INavigation,
    targetItem: INavigation,
    handler: UseMutateFunction<() => Promise<any>, Error, any[], unknown>
  ) => void;
  item: INavigation;
  handler: any;
}) => {
  const { navigation_type, children } = item;
  return (
    <section>
      {children && children.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {children.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              onDragEnd={handleDragEnd}
              handler={handler}
            />
          ))}
        </ul>
      ) : (
        (navigation_type === "group-link" || navigation_type === "group") && (
          <div
            onDrop={(e: DragEvent<HTMLDivElement>) =>
              handleDrop(e, item, handler)
            }
            onDragOver={(e) => e.preventDefault()}
            className="p-4 mt-2 border border-dashed border-gray-300 rounded-md"
          >
            Перетащите сюда элемент, чтобы добавить
          </div>
        )
      )}
    </section>
  );
};
