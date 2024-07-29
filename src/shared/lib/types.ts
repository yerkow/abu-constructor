export type NavPage = BackedPage & { children: NavPage[] };
export type PageType = "content" | "group";
export type Langs = { ru: string | number; kz: string | number };
export interface IPage {
  kzId: number | null;
  ruId: number | null;
  kz: string | null;
  ru: string | null;
  order: number;
  navigation_id: number | null;
  navigation_type: PageType;
  slug: string;
}
export interface InputComponent {
  label?: string;
  value: string;
  select?: {
    placeholder: string;
    values: {
      value: string;
      label: string;
    }[];
  };
}
export interface BaseEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}

export interface BackedPage {
  id: number;
  title: string;
  slug: string;
  order: number;
  language_key: string;
  navigation_id: any;
  navigation_type: string;
  create_date: string;
  update_date: string;
}
export interface Template
  extends Omit<BackedPage, "id" | "order" | "create_date" | "update_date"> {}
export interface BackedWidget {
  id: number;
  widget_type: string;
  options: string;
  order: number;
  navigation_id: number;
  language_key: string;
}
export interface Widget {
  ruId: number | null;
  kzId: number | null;
  kzOptions: string | null;
  ruOptions: string | null;
  order: number;
  widget_type: string;
  ru_navigation_id: number | null;
  kz_navigation_id: number | null;
}
export type WidgetProps = {
  ruWidgetId: number;
  kzWidgetId: number;
  ruOptions: any;
  kzOptions: any;
  order: number;
  ru_navigation_id: number;
  kz_navigation_id: number;
};
export type TemplateSelectType = {
  id: number;
  name: string;
  widgets: string[];
};
