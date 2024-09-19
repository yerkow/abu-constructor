import { backendUrl } from "@/shared/lib/constants";
import { getWidgetByName } from "@/widgets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alikhan Bokeikhanov University",
};

interface PageProps {
  params: { locale: string; slug: string[] };
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
      `${backendUrl}/navigations/find/by-slug?slug=${params.slug.join("/")}`,
      {
        cache: 'no-store'
      }
    );

    const data = await response.json();

    return data;
  }

  const { widgets } = await fetchNavigations();

  return widgets?.map(({ widget_type, options, contents }) => {
    const widgetOptons = { contents, options, locale: params.locale };

    //  console.log(widgetOptons);
    const widgetList = getWidgetByName(widget_type, widgetOptons);
    return widgetList;
  });
}
