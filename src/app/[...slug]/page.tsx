import { getPageBySlug } from "@/shared/api/pages";
import { getWidgetsToDisplay } from "@/shared/api/widgets";
import { capitalize } from "@/shared/lib";
import { Cards, Carousel, Text, List } from "@/widgets";
import { notFound } from "next/navigation";

const getPageContent = async (slug: string[]) => {
  console.log(slug);

  const page = await getPageBySlug(`/${slug.join("/")}`, "ru");
  console.log(page);
  if (page[0]) {
    const content = await getWidgetsToDisplay(page[0].id, "ru");
    console.log(content);

    return content;
  } else {
    return [];
  }
};

export default async function Page({ params }: { params: { slug: string[] } }) {
  const data = await getPageContent(params.slug);
  // let content = JSON.parse(localStorage.getItem("1720511119640") || "[]");
  console.log(data);
  // if (data.length == 0) return notFound();
  return (
    <section className="p-10">
      {data
        .sort((a, b) => a.order - b.order)
        .map((m: any) =>
          getWidgetByName(capitalize(m.widget_type), JSON.parse(m.options)),
        )}
    </section>
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
