import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui";
import { EditOptionsProps } from "@/widgets/EditWidget/model/types";
import { viewInputByType } from "@/widgets/EditWidget/ui";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const ContentManageModal = ({
    handleCreateContent,
    handleUpdateContent,
    contents,
    widgetOptionsList,
    variant,
    TemplateSection,
    id,
    widget_type,
}: {
    handleCreateContent: any;
    handleUpdateContent: any;
    widget_type: string;
    id?: number | undefined;
    TemplateSection?: any
    contents?: any | undefined;
    variant: "create" | "update";
    widgetOptionsList: EditOptionsProps[];
}) => {
    const [open, setOpen] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);
    const { register, handleSubmit, control, reset } = useForm({
        mode: "onBlur",
        defaultValues: {
            content: {},
            id: id,
        },
    });

    useEffect(() => {
        if (contents) {
            reset((prevValues) => ({
                ...prevValues,
                content: contents,
            }));
        }
    }, [contents]);

    const options = widgetOptionsList.find(
        (item) => item.widgetName === widget_type
    )?.contentOptions;
    const handleFunc =
        variant === "create" ? handleCreateContent : handleUpdateContent;

    const onSubmit = async (data: any) => {
        await handleFunc(data);
        closeRef.current?.click();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className={variant === "create" ? `w-full` : ""}>
                <Button>
                    {variant === "create" ? "Создать контент" : "Редактировать"}{" "}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] max-h-[95%] overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle>
                        {variant === "create" ? "Создать" : "Редактировать"} контент
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {options &&
                        options.map((option) => (
                            <Fragment key={option.props}>
                                {viewInputByType(option.type, option, register, control)}
                            </Fragment>
                        ))}
                    {
                        variant === "update" && (
                            <TemplateSection content_id={id} />
                        )
                    }

                    <Button className="w-full" type="submit">
                        {variant === "create" ? "Создать" : "Изменить"}
                    </Button>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            className="w-full"
                            ref={closeRef}
                            type="button"
                            variant="secondary"
                        >
                            Отменить
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};