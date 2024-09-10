import { Content } from "@/shared/types";
import { UseFormRegister } from "react-hook-form";

export interface EditWidgetProps {
  widgetId: string;
}

export interface EditOptionsProps {
  widgetName: string;
  widgetOptions: Array<any>;
  contentOptions: Array<any>;
}

export interface EditorMainProps {
  register: UseFormRegister<any>;
  widgetOptions: EditOptionsProps | undefined;
  handleSubmit: any;
  control: any;
}

export interface IContentCreationParams {
  content: Pick<Content, "content">;
  options: any;
  widgetId: number;
}

export interface IContentUpdateParams {
  data: Partial<Omit<Content, "id">>;
  id: number;
}
