import React from "react";

import {
  DeletePageBtn,
  NavigationCreateModal,
  NavigationEditModal,
} from "@/features";

import { INavigation } from "@/shared/lib/types";

export const NavigationControl = ({
  item,
  locale,
}: {
  locale: string;
  item: INavigation;
}) => {
  const { navigation_type, title, id } = item;
  return (
    <section className="flex items-center">
      <h3 className="grow">{title[locale]}</h3>
      <div className="flex gap-2 ">
        <NavigationEditModal navigationItem={item} />
        {(navigation_type === "group-link" || navigation_type === "group") && (
          <NavigationCreateModal parent_id={id} />
        )}
        <DeletePageBtn navigationId={id} name={title[locale]} />
      </div>
    </section>
  );
};
