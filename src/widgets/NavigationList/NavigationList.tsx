"use client";
import { NavigationItem } from "./NavigationItem";
import { useNavigations } from "./model/useNavigations";

export const NavigationList = () => {
  const { data, isLoading, handleUpdateOrder } = useNavigations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {data?.map((item) => (
        <NavigationItem key={item.id} item={item} handler={handleUpdateOrder} />
      ))}
    </ul>
  );
};