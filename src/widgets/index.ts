import { AccordionEditOptions } from "./Accordion";
import { CardEditOptions } from "./Cards";
import { ListEditOptions } from "./List/config";
import { InfoEditOptions } from "./Info/config";

import Accordion from "./Accordion/Accordion";
import Cards from "./Cards/Cards";
import Carousel from "./Carousel/CarouselServer";
import Gallery from "./Gallery/GalleryServer";
import Info from "./Info/Info";
import Links from "./Links/Links";
import List from "./List/List";
import Text from "./Text/Text";

export { EditWidget } from "./EditWidget/EditWidget";
export { NavigationList } from "./NavigationList/NavigationList";
export { AdminSidebar } from "./AdminSidebar/AdminSidebar";
export { BreadCrumbs } from "./BreadCrumbs";
export { BurgerMenu } from "./BurgerMenu/BurgetMenu";
export { Header } from "./Header/Header";
export { NavigationPageContent } from "./NavigationPageContent/NavigationPageContent";

export {
  Accordion,
  Cards,
  Carousel,
  Gallery,
  Info,
  Links,
  List,
  Text,
};

export const widgetsList = [
  Cards,
  Carousel,
  List,
  Text,
  Links,
  Info,
  Accordion,
  Gallery,
];

export const WidgetOptionList = [AccordionEditOptions, CardEditOptions, ListEditOptions, InfoEditOptions];

export const getWidgetByName = (name: string, props: any) => {
  const widget = widgetsList.find((w) => {
    return w.displayName == name;
  });

  if (widget) {
    return widget({ ...props });
  }
  return null;
};
