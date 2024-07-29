import { TemplatesSelect } from "@/features";
import { useTemplates } from "@/shared/lib/hooks";
import { InputComponent } from "@/shared/lib/types";
import {
  Button,
  EditItemWrapper,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { FileUploader } from "@/widgets/FileUploader";
import { TemplateWidgetsList } from "@/widgets/TemplateWidgetsList";
import { DeleteIcon } from "lucide-react";
import { Fragment } from "react";

interface EditItemProps {
  id: string;
  item: any;
  title: string;
  deleteItem: () => void;
  modalVariant?: string;
  keys: string[];
  withTemplate: boolean;
  inputs: InputComponent[];
  writeChanges: (val: {
    id?: string;
    field: string;
    value: string | File;
  }) => void;
}
interface TemplateRendererProps {
  id: string;
  item: any;
  writeChanges: (val: {
    id: string;
    field: string;
    value: string | File;
  }) => void;
  modalVariant?: string;
}
export const getInput = (
  input: InputComponent,
  field: string,
  writeFn: (
    val:
      | { id: string; field: string; value: string | File }
      | { field: string; value: string | File },
  ) => void,
  item: any,
  id?: string,
) => {
  switch (input.value) {
    case "text":
      return (
        <Input
          label={input.label ?? ""}
          value={item[field]}
          onChange={(e) => writeFn({ id: id, field, value: e.target.value })}
        />
      );
    case "select":
      return (
        <>
          {input.select && (
            <Select
              value={item[field]}
              onValueChange={(value) => writeFn({ id, field, value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={input.select.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {input.select.values.map(({ value, label }, idx) => (
                  <SelectItem key={idx} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </>
      );
    case "file":
      return (
        <FileUploader
          field={field}
          id={id}
          file={item[field]}
          forImage
          writeChanges={writeFn}
        />
      );
    default:
      return <></>;
  }
};
const TemplateRenderer = ({
  id,
  item,
  modalVariant,
  writeChanges,
}: TemplateRendererProps) => {
  const { isSaved, templates, setTemplates, selectedTemplate, onSelect } =
    useTemplates({
      savedTemplate: item.savedTemplate,
    });

  return (
    <>
      {modalVariant === "card" && (
        <TemplatesSelect
          savedTemplate={isSaved ? item.savedTemplate : ""}
          templates={templates}
          onSelect={(template) => {
            onSelect(template, (w) => {
              writeChanges({
                id,
                field: "templateWidgets",
                value: JSON.stringify(w.widgets),
              });
              writeChanges({ id, field: "savedTemplate", value: w.name });
            });
          }}
        />
      )}
      {(item.templateWidgets || selectedTemplate) && (
        <TemplateWidgetsList
          id={id}
          saved={item.templateWidgets}
          selectedTemplate={selectedTemplate}
        />
      )}
    </>
  );
};
export const EditItem = ({
  id,
  keys,
  inputs,
  item,
  modalVariant,
  withTemplate,
  title,
  deleteItem,
  writeChanges,
}: EditItemProps) => {
  return (
    <EditItemWrapper
      buttons={
        <>
          <Button onClick={deleteItem} size={"icon"}>
            <DeleteIcon />
          </Button>
        </>
      }
      title={title + " " + id}
    >
      {withTemplate && (
        <TemplateRenderer
          id={id}
          modalVariant={modalVariant}
          writeChanges={writeChanges}
          item={item}
        />
      )}
      {inputs.map((input, idx) => (
        <Fragment key={idx}>
          {getInput(input, keys[idx], writeChanges, item, id)}
        </Fragment>
      ))}
    </EditItemWrapper>
  );
};
