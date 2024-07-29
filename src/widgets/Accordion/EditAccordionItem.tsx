import { Button, EditItemWrapper, Input } from "@/shared/ui";
import { DeleteIcon } from "lucide-react";

export const EditAccordionItem = ({
  id,
  deleteItem,
  item,
  writeChanges,
}: {
  id: string;
  item: any;
  writeChanges: (id: string, field: string, value: string | File) => void;
  deleteItem: () => void;
}) => {
  return (
    <EditItemWrapper
      title={"Вопрос " + id}
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
          label="Вопрос на русском"
          type="text"
          value={item.questionRu}
          onChange={(e) => writeChanges(id, "questionRu", e.target.value)}
        />
        <Input
          label="Вопрос на казахском"
          type="text"
          value={item.questionKz}
          onChange={(e) => writeChanges(id, "questionKz", e.target.value)}
        />
        <Input
          label="Ответ Рус"
          type="text"
          value={item.answerRu}
          onChange={(e) => writeChanges(id, "answerRu", e.target.value)}
        />
        <Input
          label="Ccылка Каз"
          type="text"
          value={item.answerKz}
          onChange={(e) => writeChanges(id, "answerKz", e.target.value)}
        />
      </div>
    </EditItemWrapper>
  );
};
