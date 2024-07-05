import { DeletePageBtn, EditPageDialog } from "@/features";
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
import Link from "next/link";
interface PagesListTableProps {
  pages: IPage[];
}
export const PagesListTable = ({ pages }: PagesListTableProps) => {
  return (
    <Table className="w-[90%] max-w-[390px] sm:max-w-full overflow-x-auto m-auto h-full overflow-hidden">
      <TableCaption>Доступные страницы</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>На русском</TableHead>
          <TableHead>На казахском</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead className="text-center">Дочерние страницы</TableHead>
          <TableHead className="text-center">Редактировать</TableHead>
          <TableHead className="text-center">Удалить страницy</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pages.map((page) => (
          <TableRow key={page.id}>
            <TableCell className="font-medium">{page.ru}</TableCell>
            <TableCell>{page.kz}</TableCell>
            <TableCell>{page.slug}</TableCell>
            <TableCell className="text-center">
              {page.pageType == "group" && (
                <Link href={`/admin/pages/${page.id}`}>
                  <Button size={"sm"}>Перейти</Button>
                </Link>
              )}
            </TableCell>
            <TableCell className="text-center">
              <EditPageDialog page={page} />
            </TableCell>
            <TableCell className="text-center">
              <DeletePageBtn id={page.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
