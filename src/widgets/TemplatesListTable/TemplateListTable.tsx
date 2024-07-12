"use client";
import { DeletePageBtn } from "@/features";
import { getTemplates } from "@/shared/api/pages";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
interface TemplateListTableProps {}
export const TemplatesListTable = ({}: TemplateListTableProps) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["getTemplates"],
    queryFn: getTemplates,
  });
  if (isFetching)
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10 align-middle" />{" "}
      </div>
    );
  if (!data || data.length == 0) return <div>Шаблоны не найдены</div>;
  return (
    <Table className="w-[90%] max-w-[390px] sm:max-w-full overflow-x-auto m-auto h-full overflow-hidden">
      <TableCaption>Доступные шаблоны</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead className="text-center">Редактировать</TableHead>
          <TableHead className="text-center">Удалить страницy</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((page) => (
          <TableRow key={page.id}>
            <TableCell>{page.title}</TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center">
              <DeletePageBtn
                name={page.title}
                queryKey={["getTemplates"]}
                ids={{ id: page.id }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
