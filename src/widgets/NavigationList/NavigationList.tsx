"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { INavigation, INavListUpdateOrderOptions } from "./model/Navigation.model";
import { NavigationItem } from "./NavigationItem";


export const NavigationList = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (options: INavListUpdateOrderOptions[]) => {
      const response = await fetch("http://localhost:3003/navigations/orders/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      return response.json
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["navigations"],
      });
    },
  })

  const handleContainerDragEnd = (e: React.DragEvent<HTMLUListElement>) => {
    const draggedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log(draggedItem)
    // Если событие drop произошло вне зоны списка, parent_id у элемента будет null

  };


  const handleDragEnd = (e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>, draggedItem: INavigation, targetItem: INavigation) => {
    e.stopPropagation();

    // Оба элемента на одном уровне и targetItem - content
    if (
      draggedItem.parent_id === targetItem.parent_id &&
      targetItem.navigation_type === "content"
    ) {
      mutate([
        { id: draggedItem.id, order: targetItem.order },
        { id: targetItem.id, order: draggedItem.order },
      ]);
    }
    // Дроп за пределы текущего контейнера
    else if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) {
      mutate([{ id: draggedItem.id, order: 1, parent_id: null }]);
    }
    // Дроп в группу
    else if (
      targetItem.navigation_type === "group" &&
      draggedItem.parent_id !== targetItem.id
    ) {
      const newOrder = (targetItem.children ? targetItem.children.length : 0) + 1;
      mutate([{ id: draggedItem.id, order: newOrder, parent_id: targetItem.id }]);
    }
    // Любое другое перемещение (между элементами разных родителей)
    else {
      mutate([
        { id: draggedItem.id, order: targetItem.order, parent_id: targetItem.parent_id },
      ]);
    }
  };



  const { data, isLoading } = useQuery<INavigation[]>({
    queryKey: ["navigations"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3003/navigations");
      return response.json();
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ul className="flex flex-col gap-3" >
      {
        data?.map((item) => <NavigationItem key={item.id} item={item} onDragEnd={handleDragEnd} />)
      }
    </ul>
  );
};