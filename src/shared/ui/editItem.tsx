import { ReactNode } from "react";

interface EditItemProps {
  children: ReactNode;
  title: string;
  buttons: ReactNode;
}
export const EditItem = ({ children, title, buttons }: EditItemProps) => {
  return (
    <div className="bg-slate-100 p-2 rounded-md flex flex-col gap-4 ">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl ">{title}</h2>
        <div className="flex gap-2">{buttons}</div>
      </div>
      {children}
    </div>
  );
};
