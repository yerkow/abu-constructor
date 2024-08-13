"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";

export interface INavigation {
  id: number;
  title: {
    [key: string]: string;
  };
  slug: string;
  navigation_type: "content" | "group" | "template";
  order: number;
  parent_id: null | number;
  children: INavigation[];
  createdAt: string;
  updatedAt: string;
}

interface INavListUpdateOrderOptions {
  id: number;
  order: number;
  parent_id?: number | null;
}

export const NavList = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (options: INavListUpdateOrderOptions[]) => {
      console.log(options)
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


  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>, draggedItem: INavigation, targetItem: INavigation) => {
    e.stopPropagation();
    console.log('draggetItem', draggedItem.parent_id)
    console.log('targetItem', targetItem.parent_id)
    if (draggedItem.parent_id === targetItem.parent_id) {
      mutate([{ id: draggedItem.id, order: targetItem.order }, { id: targetItem.id, order: draggedItem.order }])
    } else {
      mutate([{ id: draggedItem.id, order: targetItem.order, parent_id: targetItem.parent_id }])
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
    <ul className="flex flex-col gap-3">
      {
        data?.map((item) => <NavItem key={item.id} item={item} onDragEnd={handleDragEnd} />)
      }
    </ul>
  );
};


const NavItem = ({ item, onDragEnd }: { item: INavigation; onDragEnd: (e: React.DragEvent<HTMLLIElement>, draggedItem: INavigation, targetItem: INavigation) => void }) => {
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, navItem: INavigation) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", JSON.stringify(navItem));
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, targetNavItem: INavigation) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.currentTarget !== e.target) return;

    const draggedItem: INavigation = JSON.parse(e.dataTransfer.getData("text/plain"));
    onDragEnd(e, draggedItem, targetNavItem);
  };

  return (
    <li
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      onDrop={(e) => handleDrop(e, item)}
      onDragOver={(e) => e.preventDefault()}
      className={"p-4 border border-gray-200 rounded-md"}
    >
      {item.title["kz"]}
      {item.children && (
        <ul className="flex flex-col gap-3">
          {item.children.map((child) => (
            <NavItem key={child.id} item={child} onDragEnd={onDragEnd} />
          ))}
        </ul>
      )}
    </li>
  );
};