import { getPageBySlug } from "@/shared/api/pages";
import { getWidgetsToDisplay } from "@/shared/api/widgets";
import { capitalize } from "@/shared/lib";
import { getWidgetByName } from "@/shared/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
interface PageProps {
  params: { locale: string; slug: string[] };
}
const getPageContent = async (slug: string[], locale: string) => {
  const page = await getPageBySlug(`/${slug.join("/")}`, locale);
  if (page[0]) {
    const content = await getWidgetsToDisplay(page[0].id, locale);

    return content;
  } else {
    return [];
  }
};
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug, locale } = params;
  const page = (await getPageBySlug(`/${slug.join("/")}`, locale))[0];

  return {
    title: !page
      ? "Профсоюз работников образования «Әділет» г. Нур-Султан"
      : page.title.includes("template")
        ? "Профсоюз"
        : page.title,
  };
}

export default async function Page({ params }: PageProps) {
  const data = await getPageContent(params.slug, params.locale);
  console.log(data);

  // if (data.length == 0) return notFound();
  return data
    .sort((a, b) => a.order - b.order)
    .map((m: any) =>
      getWidgetByName(capitalize(m.widget_type), JSON.parse(m.options)),
    );
}
