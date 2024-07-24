import { getPageBySlug } from "@/shared/api/pages";
import { getWidgetsToDisplay } from "@/shared/api/widgets";
import { capitalize } from "@/shared/lib";
import { Cards, Carousel, Text, List } from "@/widgets";
import { ResolvingMetadata, Metadata } from "next";
import { notFound } from "next/navigation";
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
  console.log(data, "DATA");

  // let content = JSON.parse(localStorage.getItem("1720511119640") || "[]");
  // if (data.length == 0) return notFound();
  return data
    .sort((a, b) => a.order - b.order)
    .map((m: any) =>
      getWidgetByName(capitalize(m.widget_type), JSON.parse(m.options)),
    );
}

const getWidgetByName = (name: string, props: any) => {
  switch (name) {
    case "Carousel":
      return <Carousel {...props} />;
    case "Cards":
      return <Cards {...props} />;
    case "List":
      return <List {...props} />;

    case "Text":
      return <Text {...props} />;
    default:
      return <></>;
  }
};
