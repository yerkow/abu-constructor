import { getPageBySlug } from "@/shared/api/pages";
import { getWidgetsToDisplay } from "@/shared/api/widgets";
import { capitalize } from "@/shared/lib";
import { Cards, Carousel, Text, List } from "@/widgets";

const getPageContent = async (slug: any) => {
  const page = await getPageBySlug(`/${slug}`, "ru");
  if (page[0]) {
    const content = await getWidgetsToDisplay(page[0].id, "ru");
    return content;
  } else {
    return [];
  }
};

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getPageContent(params.slug);
  // let content = JSON.parse(localStorage.getItem("1720511119640") || "[]");
  console.log(data);

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
