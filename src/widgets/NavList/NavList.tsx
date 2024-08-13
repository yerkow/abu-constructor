"use client";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState, forwardRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export interface INavigation {
  id: number;
  title: {
    [key: string]: string;
  };
  slug: string;
  navigation_type: "content" | "group" | "template";
  order: number;
  parent_id: null | number;
  children?: INavigation[];
  createdAt: string;
  updatedAt: string;
}

export const NavList = () => {
  const [navigations, setNavigations] = useState<INavigation[]>([
    {
      id: 1,
      title: {
        kz: "Басты",
        ru: "Главная",
      },
      slug: "home",
      navigation_type: "content",
      order: 1,
      parent_id: null,
      createdAt: "2024-08-11T10:27:33.476Z",
      updatedAt: "2024-08-12T17:56:02.838Z",
      children: [],
    },
    {
      id: 2,
      title: {
        kz: "Біз туралы",
        ru: "О нас",
      },
      slug: "about",
      navigation_type: "group",
      order: 2,
      parent_id: null,
      createdAt: "2024-08-11T10:29:42.375Z",
      updatedAt: "2024-08-11T13:47:36.479Z",
      children: [
        {
          id: 3,
          title: {
            kz: "Құрамы",
            ru: "Структура",
          },
          slug: "structure",
          navigation_type: "content",
          order: 1,
          parent_id: 2,
          createdAt: "2024-08-11T10:30:30.235Z",
          updatedAt: "2024-08-11T10:30:30.235Z",
          children: [],
        },
        {
          id: 15,
          title: {
            kz: "Біз",
            ru: "Мы",
          },
          slug: "we",
          navigation_type: "content",
          order: 2,
          parent_id: 2,
          createdAt: "2024-08-11T10:30:30.235Z",
          updatedAt: "2024-08-11T10:30:30.235Z",
          children: [],
        },
      ],
    },
    {
      id: 18,
      title: {
        kz: "Галерея",
        ru: "Галерея",
      },
      slug: "gallery",
      navigation_type: "content",
      order: 3,
      parent_id: null,
      createdAt: "2024-08-11T10:59:59.460Z",
      updatedAt: "2024-08-11T13:47:36.483Z",
      children: [],
    },
  ]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(navigations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNavigations(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <section
            className="flex flex-col gap-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {navigations.map((nav, index) => (
              <Draggable
                key={nav.id}
                draggableId={String(nav.id)}
                index={index}
              >
                {(provided) => (
                  <NavItem
                    item={nav}
                    navigations={navigations}
                    setNavigations={setNavigations}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const NavItem = forwardRef<
  HTMLDivElement,
  {
    item: INavigation;
    navigations: INavigation[];
    setNavigations: Dispatch<SetStateAction<INavigation[]>>;
  }
>(({ item, navigations, setNavigations, ...props }, ref) => {
  return (
    <article {...props} ref={ref}>
      {item.title["kz"]}
      <section className="flex flex-col gap-2">
        {/* {item.children &&
			  item.children.map((child) => (
				 <NavItem
					key={child.id}
					item={child}
					navigations={navigations}
					setNavigations={setNavigations}
				 />
			  ))} */}
      </section>
    </article>
  );
});
