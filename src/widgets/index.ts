import { AccordionEditOptions } from "./Accordion";
import { CardEditOptions } from "./Cards/config";
import { ListEditOptions } from "./List/config";
import { InfoEditOptions } from "./Info/config";
import { TextEditOptions } from "./Text/config";
import { LinkEditOptions } from "./Links/config";
import { TabsEditOptions } from "./Tabs/config";
import { CarouselEditOptions } from "./Carousel/config";
import { GalleryEditOptions } from "./Gallery/config";

import Accordion from "./Accordion/Accordion";
import Cards from "./Cards/Cards";
import Carousel from "./Carousel/Carousel";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import Links from "./Links/Links";
import List from "./List/List";
import Text from "./Text/Text";
import Tabs from "./Tabs/Tabs";

export { EditWidget } from "./EditWidget/EditWidget";
export { NavigationList } from "./NavigationList";
export { TemplateList } from "./TemplateList/TemplateList";
export { AdminSidebar } from "./AdminSidebar/AdminSidebar";
export { BreadCrumbs } from "./BreadCrumbs";
export { BurgerMenu } from "./BurgerMenu/BurgetMenu";
export { Header } from "./Header/Header";
export { NavigationPageContent } from "./NavigationPageContent";

export { Accordion, Cards, Carousel, Gallery, Info, Links, List, Text };

export const widgetsList = [
  Cards,
  Carousel,
  List,
  Text,
  Links,
  Info,
  Accordion,
  Gallery,
  Tabs,
];

export const WidgetOptionList = [
  AccordionEditOptions,
  CardEditOptions,
  ListEditOptions,
  CarouselEditOptions,
  InfoEditOptions,
  TextEditOptions,
  LinkEditOptions,
  TabsEditOptions,
  GalleryEditOptions,
];

export const getWidgetByName = (name: string, props: any) => {
  const widget = widgetsList.find((w) => {
    return w.displayName == name;
  });

  if (widget) {
    return widget({ ...props });
  }
  return null;
};
