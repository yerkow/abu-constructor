export type PageType = "content" | "group";
export type Langs = { ru: string; kz: string };
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
export interface Widget {
  id: number;
  widget_type: string;
  options: string;
  order: number;
  navigation_id: number;
  language_key: string;
}
