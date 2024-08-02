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
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
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
          const data = await getPagesChildren(ids);
          return data;
        },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  const t = useTranslations("pages.table");
  const { locale } = useParams();
  if (isFetching)
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10 align-middle" />{" "}
      </div>
    );
  if (!data) return <div>{t("notFound")}</div>;
  return (
    <Table className="w-[90%] max-w-[390px] sm:max-w-full overflow-x-auto m-auto h-full overflow-hidden">
      <TableCaption>{t("caption")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>{t("nameRu")}</TableHead>
          <TableHead>{t("nameKz")}</TableHead>
          <TableHead>{t("slug")}</TableHead>
          <TableHead>{t("order")}</TableHead>
          <TableHead className="text-center">{t("childPages")}</TableHead>
          <TableHead className="text-center">{t("edit")}</TableHead>
          <TableHead className="text-center">{t("delete")}</TableHead>
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
                  href={`/${locale}/admin/pages/${encodeURIComponent(page.slug)}?ruId=${page.ruId}&kzId=${page.kzId}`}
                >
                  <Button size={"sm"}>{t("follow")}</Button>
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
                  name={locale == "ru" ? page.ru : page.kz}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
