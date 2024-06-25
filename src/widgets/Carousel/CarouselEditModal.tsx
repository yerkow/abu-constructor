import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EditItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useState } from "react";

export const CarouselEditModal = () => {
  const [count, setCount] = useState(0);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Carousel</CardTitle>
        <CardDescription>There you can edit Carousel content</CardDescription>
      </CardHeader>
      <CardContent className="flex  flex-col gap-3">
        <div className="flex gap-2  flex-col">
          <Label>Select text position</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setCount(count + 1)} className="w-full">
          Add new Carousel Item
        </Button>
        <div className="flex flex-col gap-2 mt-2 max-h-[320px] overflow-auto ">
          {new Array(count).fill("0").map((_, idx) => (
            <EditCarouselItem idx={idx} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const EditCarouselItem = ({ idx }: { idx: number }) => {
  return (
    <EditItem
      title={"Carousel Item" + (idx + 1)}
      buttons={
        <>
          <Button size={"sm"}>Save</Button>
          <Button size={"sm"}>Delete</Button>
        </>
      }
    >
      <Input label="Image" type="file" />

      <div className="flex gap-3 flex-col md:flex-row">
        <Input label="Content RU" />
        <Input label="Content KZ" />
      </div>
    </EditItem>
  );
};
