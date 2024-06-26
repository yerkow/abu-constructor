import { PageDialog } from "@/features";
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
const mockPages = new Array(20)
  .fill({
    ru: "Главная",
    kz: "Басты",
    slug: "/",
  })
  .map((page, idx) => ({ ...page, id: idx + 1 }));
export const PagesListTable = () => {
  return (
    <Table className="w-[90%] max-w-[390px] sm:max-w-full overflow-x-auto m-auto h-full overflow-hidden">
      <TableCaption>Доступные страницы</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>На русском</TableHead>
          <TableHead>На казахском</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Coдержание</TableHead>
          <TableHead className="text-right">Редактировать</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockPages.map((page) => (
          <TableRow>
            <TableCell className="font-medium">{page.ru}</TableCell>
            <TableCell>{page.kz}</TableCell>
            <TableCell>{page.slug}</TableCell>
            <TableCell>
              <Link href={`/admin/pages/${page.id}`}>
                <Button size={"sm"}>Перейти</Button>
              </Link>
            </TableCell>
            <TableCell className="text-right ">
              <PageDialog variant="edit" page={page} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
