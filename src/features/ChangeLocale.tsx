"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useParams, usePathname, useRouter } from "next/navigation";

export const ChangeLocale = () => {
  const params = useParams();
  const router = useRouter();
  const path = usePathname().split("/");
  const slug = path.slice(2, path.length).join("/");

  const handleChange = (value: string) => {
    router.replace(`/${value}/${slug}`);
  };

  return (
    <Select
      value={params.locale as string}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="w-[75px] font-bold text-cyan-800 flex">
        <SelectValue placeholder={params.locale} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ru">RU</SelectItem>
        <SelectItem value="kz">KZ</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
};
