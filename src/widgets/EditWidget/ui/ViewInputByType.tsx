import { locales } from "@/i18n";
import { Controller, UseFormRegister } from "react-hook-form";
import QuillEditor from "@/shared/ui/quill-editor";
import { FileUploader } from "@/widgets/FileUploader";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

export const viewInputByType = (
  type: string,
  options: any,
  register: UseFormRegister<any>,
  control: any,
  setIsUploading?: (uploading: boolean) => void
) => {
  switch (type) {
    case "text":
      return (
        <section className="flex flex-col gap-3 border p-5">
          <p>{options.placeholder}</p>
          <section className="flex  gap-3">
            {locales.map((locale) => (
              <Input
                key={locale}
                label={options.placeholder + ` (${locale})`}
                {...register(`content.${locale}.${options.props}`)}
                className="flex-grow"
              />
            ))}
          </section>
        </section>
      );
    case "quill":
      return (
        <section className="flex flex-col gap-3 border p-5">
          <p>{options.placeholder}</p>
          <section className="flex flex-wrap gap-3 flex-col ">
            {locales.map((locale) => (
              <Controller
                key={locale}
                name={`content.${locale}.${options.props}`}
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    key={locale}
                    label={options.placeholder + ` (${locale})`}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            ))}
          </section>
        </section>
      );
    case "select": {
      return (
        <section className="flex flex-col gap-3 border p-5">
          <p>{options.placeholder}</p>
          <Controller
            name={options.props}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выберите вид" />
                </SelectTrigger>
                <SelectContent>
                  {options.values.map(
                    ({ value, label }: { value: string; label: string }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </section>
      );
    }
    case "file":
      return (
        <Controller
          name={`content.${options.props}`}
          control={control}
          render={({ field }) => (
            <FileUploader
              label={options.label ?? ""}
              field={"image"}
              id={field.name}
              file={field.value}
              onChange={(val) => {
                if (!setIsUploading) {
                  field.onChange(val);
                  return;
                }
                setIsUploading(true);
                field.onChange(val);
                setIsUploading(false);
              }}
            />
          )}
        />
      );
    default:
      return null;
  }
};
