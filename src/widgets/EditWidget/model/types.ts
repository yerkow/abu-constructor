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
  widgetOptions: EditOptionsProps;
  handleSubmit: any;
  control: any;
}

export interface IContentCreationParams {
  data: Pick<Content, "content">;
  widgetId: number;
}

export interface IContentUpdateParams {
  data: Partial<Omit<Content, "id">>;
  id: number;
}
