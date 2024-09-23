import { UseMutateFunction } from "@tanstack/react-query";
import { IWidgetUpdateOrderOptions } from "../model/types";
import { IWidget } from "@/shared/types";

export const handleDragEnd = (
  e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
  draggedItem: IWidget,
  targetItem: IWidget,
  handler: UseMutateFunction<
    () => Promise<any>,
    Error,
    IWidgetUpdateOrderOptions[],
    unknown
  >
) => {
  e.stopPropagation();
  handler([
    { id: draggedItem.id, order: targetItem.order },
    { id: targetItem.id, order: draggedItem.order },
  ]);
};
