import { Button, Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
import { Settings } from "lucide-react";
import { ReactNode } from "react";

export const EditWidgetContentDialog = ({ modal }: { modal: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        // save widget order on click
        <Button size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-full ">{modal}</DialogContent>
    </Dialog>
  );
};
