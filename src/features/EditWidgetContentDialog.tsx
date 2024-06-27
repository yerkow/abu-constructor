import { Button, Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
import { Settings } from "lucide-react";
import { ReactNode } from "react";

export const EditWidgetContentDialog = ({ modal }: { modal: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">{modal}</DialogContent>
    </Dialog>
  );
};
