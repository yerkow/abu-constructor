"use client";
import { capitalize } from "@/shared/lib";
import { Cards, Carousel, Text } from "@/widgets";

// const getPageContent = async (slug: any) => {
//   const { data } = await fetch("/hello");
//   return data;
// };

const mockCarouselItems = new Array(9).fill({
  img: "/123.jpg",
  title: "Title",
  href: `/party/${Math.ceil(Math.random() * 100)}`,
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
});

const mock = [
  {
    name: "Text",
    props: {
      heading: "Hello World",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    },
  },
  {
    name: "Carousel",
    props: {
      items: mockCarouselItems,
      position: "left",
    },
  },
];
export default function Page() {
  // const data = await getPageContent(params.slug);
  let content = JSON.parse(localStorage.getItem("1720511119640") || "[]");

  return (
    <section className="p-10">
      {content.map((m: any) =>
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

    case "Text":
      return <Text {...props} />;
    default:
      return <></>;
  }
};
