import { Button, Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
import { Settings } from "lucide-react";
import { cloneElement, ReactNode } from "react";

export const EditWidgetContentDialog = ({
  modal,
  order,
}: {
  modal: ReactNode;
  order: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* save widget order on click */}
        <Button size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-full ">
        {cloneElement(modal as React.ReactElement<any>, { order })}
      </DialogContent>
    </Dialog>
  );
};
