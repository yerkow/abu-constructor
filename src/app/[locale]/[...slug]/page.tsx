import { getPageBySlug } from "@/shared/api/pages";
import { backendUrl } from "@/shared/lib/constants";
import { getWidgetByName } from "@/widgets";
import { Metadata } from "next";
interface PageProps {
  params: { locale: string; slug: string[] };
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug, locale } = params;
  const page = (await getPageBySlug(`/${slug.join("/")}`, locale))[0];

  return {
    title: !page
      ? "Alikhan Bokeikhanov University"
      : page.title.includes("template")
        ? "Alikhan Bokeikhanov University"
        : page.title,
  };
}

export interface INavigation {
  id: number;
  title: {
    [key: string]: string;
  };
  slug: string;
  navigation_type: string;
  order: number;
  parent_id: null | number;
  createdAt: string;
  updatedAt: string;
  widgets: Array<IWidget>;
}

export interface IWidget {
  id: number;
  widget_type: string;
  options: {
    [key: string]: any;
  };
  order: number;
  navigation_id: number;
  contents: Array<any>;
  createdAt: string;
  updatedAt: string;
}

export default async function Page({ params }: PageProps) {
  async function fetchNavigations(): Promise<INavigation> {
    const response = await fetch(
      `${backendUrl}/navigations/find/by-slug?slug=${params.slug.join("/")}`
    );

    const data = await response.json();
    return data;
  }

  const { widgets } = await fetchNavigations();
  return widgets.map(({ widget_type, options, contents }) => {

    const widgetOptons = { contents, options };
    console.log(widget_type)
    console.log(contents)
    if (contents.length === 0) {
      return
    }
    const widgetList = getWidgetByName(widget_type, widgetOptons);
    return widgetList;
  });
}
