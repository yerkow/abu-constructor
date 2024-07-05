export type PageType = "content" | "group";
export interface IPage {
  id: number;
  kz: string;
  ru: string;
  navigation_id: number | null;
  pageType: PageType;
  slug: string;
}
