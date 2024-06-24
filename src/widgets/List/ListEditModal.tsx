import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
} from "@/shared/ui";
import { Label } from "@radix-ui/react-label";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";
const mock = [
  { id: 1, content: "Content1", href: "/test/1" },
  { id: 2, content: "Content2", href: "/test/1" },
  { id: 3, content: "Content3", href: "/test/1" },
  { id: 4, content: "Content4", href: "/test/1" },
];
export const ListEditModal = () => {
  const [isFiles, setIsFiles] = useState(false);
  const [listCount, setListCount] = useState(mock);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit List</CardTitle>
        <CardDescription>There you can edit List content</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <Label>List of Files</Label>
          <Checkbox
            onCheckedChange={() => setIsFiles(!isFiles)}
            checked={isFiles}
          />
        </div>
        <Button
          className="w-full"
          onClick={() =>
            setListCount([
              ...listCount,
              {
                id: +mock[mock.length - 1].id + 1,
                content: "",
                href: "",
              },
            ])
          }
        >
          Add new List item
        </Button>
        <div className="flex flex-col gap-2 mt-2 max-h-[320px] overflow-auto">
          {listCount.map((item, idx) => (
            <EditListItem
              key={item.id}
              item={item}
              idx={idx + 1}
              isFiles={isFiles}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const EditListItem = ({
  isFiles,
  idx,
  item,
}: {
  isFiles: boolean;
  idx: number;
  item: (typeof mock)[0];
}) => {
  return (
    <div className="flex flex-col gap-2 pl-2 pr-2 bg-slate-100 pt-2 pb-2 rounded-md">
      <div className="flex justify-between">
        <span>{item.id}.ListItem</span>
        <div className="flex gap-2 justify-center">
          <Button size={"sm"}>Save</Button>
          <Button size={"sm"}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <Input label="Content" type="text" value={item.content} />
      <Input
        value={item.href}
        label={isFiles ? "Document" : "Link"}
        type={isFiles ? "file" : "text"}
      />
    </div>
  );
};
