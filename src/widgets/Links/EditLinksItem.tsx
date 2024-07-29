import { Button, EditItemWrapper, Input } from "@/shared/ui";
import { DeleteIcon } from "lucide-react";

export const EditLinksItem = ({
  id,
  deleteItem,
  item,
  templateWidgets,
  writeChanges,
}: {
  id: string;
  item: any;
  writeChanges: (id: string, field: string, value: string | File) => void;
  templateWidgets?: string[];
  deleteItem: () => void;
}) => {
  return (
    <EditItemWrapper
      title={"Cсылка " + id}
      buttons={
        <>
          <Button onClick={deleteItem} size={"icon"}>
            <DeleteIcon />
          </Button>
        </>
      }
    >
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Название на русском"
          type="text"
          value={item.nameRu}
          onChange={(e) => writeChanges(id, "nameRu", e.target.value)}
        />
        <Input
          label="Название на казахском"
          type="text"
          value={item.nameKz}
          onChange={(e) => writeChanges(id, "nameKz", e.target.value)}
        />
        <Input
          label="Ccылка Рус"
          type="text"
          value={item.linkRu}
          onChange={(e) => writeChanges(id, "linkRu", e.target.value)}
        />
        <Input
          label="Ccылка Каз"
          type="text"
          value={item.linkKz}
          onChange={(e) => writeChanges(id, "linkKz", e.target.value)}
        />
      </div>
    </EditItemWrapper>
  );
};
