"use client";
import { DeletePageBtn, EditPageDialog } from "@/features";
import { getPages, getPagesChildren } from "@/shared/api/pages";
import { IPage } from "@/shared/lib";
import {
  Button,
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
import Link from "next/link";
import { useEffect } from "react";
interface PagesListTableProps {
  ids?: { ruId: number; kzId: number };
}
export const PagesListTable = ({ ids }: PagesListTableProps) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ids ? [`childPages`] : ["mainPages"],
    queryFn: !ids
      ? getPages
      : async () => {
          console.log(ids);

          const data = await getPagesChildren(ids);
          return data;
        },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  if (isFetching)
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10 align-middle" />{" "}
      </div>
    );
  if (!data) return <div>Страницы не найдены</div>;
  return (
    <Table className="w-[90%] max-w-[390px] sm:max-w-full overflow-x-auto m-auto h-full overflow-hidden">
      <TableCaption>Доступные страницы</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>На русском</TableHead>
          <TableHead>На казахском</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Порядок</TableHead>
          <TableHead className="text-center">Дочерние страницы</TableHead>
          <TableHead className="text-center">Редактировать</TableHead>
          <TableHead className="text-center">Удалить страницy</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((page) => (
          <TableRow key={page.slug}>
            <TableCell className="font-medium">{page.ru}</TableCell>
            <TableCell>{page.kz}</TableCell>
            <TableCell>{page.slug}</TableCell>
            <TableCell>{page.order}</TableCell>
            <TableCell className="text-center">
              {page.navigation_type == "group" && (
                <Link
                  href={`/admin/pages/${encodeURIComponent(page.slug)}?ruId=${page.ruId}&kzId=${page.kzId}`}
                >
                  <Button size={"sm"}>Перейти</Button>
                </Link>
              )}
            </TableCell>
            <TableCell className="text-center">
              <EditPageDialog page={page} />
            </TableCell>
            <TableCell className="text-center">
              {page.ruId && page.kzId && (
                <DeletePageBtn
                  queryKey={ids ? ["childPages"] : ["mainPages"]}
                  ids={{ kz: page.kzId, ru: page.ruId }}
                  name={page.ru || ""}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
