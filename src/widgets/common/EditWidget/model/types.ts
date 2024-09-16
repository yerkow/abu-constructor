import { IContent } from "@/shared/types";
import { UseFormRegister } from "react-hook-form";

export interface EditWidgetProps {
  widgetId: string;
}

export interface EditOptionsProps {
  widgetName: string;
  widgetOptions: Array<any>;
  contentOptions: Array<any> | ((variant: string) => Array<any>);
}

export interface EditorMainProps {
  register: UseFormRegister<any>;
  widgetOptions: EditOptionsProps | undefined;
  handleSubmit: any;
  control: any;
}

export interface IContentCreationParams {
  content: Pick<IContent, "content">;
  options: any;
  widgetId: number;
}

export interface IContentUpdateParams {
  data: Partial<Omit<IContent, "id">>;
  id: number;
}

export interface IContentUpdateOrderOptions {
  id: number;
  order: number;
}
