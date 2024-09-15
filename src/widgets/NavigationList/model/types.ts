import { DragAndDropProps } from "@/shared/lib/hooks/useDrag&Drop";
import { INavigation } from "@/shared/lib/types";
import { UseMutateFunction } from "@tanstack/react-query";

export interface INavListUpdateOrderOptions {
  id: number;
  order: number;
  parent_id?: number | null;
}

export interface INavigationItemProps {
  item: INavigation;
  onDragEnd?: DragAndDropProps<INavigation>;
  handler: UseMutateFunction<() => Promise<any>, Error, any[], unknown>;
}
