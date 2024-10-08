import { backendUrl } from "@/shared/lib/constants";
import { getWidgetByName } from "@/widgets";
import { SideMenu } from "@/widgets/common/SideMenu/SideMenu";
import { Metadata } from "next";
import { IWidget } from "@/shared/types";
import clsx from "clsx";
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

export default async function Page({ params }: PageProps) {
  async function fetchNavigations(): Promise<INavigation> {
    const response = await fetch(
      `${backendUrl}/navigations/find/by-slug?slug=${params.slug.join("/")}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    return data;
  }

  const { widgets } = await fetchNavigations();

  const widgetList = widgets?.map(({ widget_type, options, contents }, idx) => {
    const widgetOptons = { contents, options, locale: params.locale };
    const widgetContent = getWidgetByName(widget_type, widgetOptons);
    return (
      <div id={`widget-${idx}`} key={idx} style={{ scrollMarginTop: "200px" }}>
        {widgetContent}
      </div>
    );
  });

  return (
    <section
      className={clsx(
        widgets?.length >= 3 && "sm:grid sm:grid-cols-[1fr_210px] sm:gap-5"
      )}
    >
      <section className="flex flex-col gap-10 scroll-behavior: smooth">
        {widgetList}
      </section>
      {widgets?.length >= 3 && (
        <SideMenu widgets={widgets} locale={params.locale} />
      )}
    </section>
  );
}
