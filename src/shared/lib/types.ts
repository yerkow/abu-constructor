export type PageType = "content" | "group";
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
