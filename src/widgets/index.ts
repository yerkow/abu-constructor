import { AccordionEditOptions } from "./constructor/Accordion/config";
import { CardEditOptions } from "./constructor/Cards/config";
import { ListEditOptions } from "./constructor/List/config";
import { InfoEditOptions } from "./constructor/Info/config";
import { TextEditOptions } from "./constructor/Text/config";
import { LinkEditOptions } from "./constructor/Links/config";
import { TabsEditOptions } from "./constructor/Tabs/config";
import { CarouselEditOptions } from "./constructor/Carousel/config";
import { GalleryEditOptions } from "./constructor/Gallery/config";
import { StepSwitcherEditOptions } from "./constructor/StepSwitcher/config";
import { PersonProfilesEditOptions } from "./constructor/PersonProfiles/config";

import Accordion from "./constructor/Accordion/Accordion";
import Cards from "./constructor/Cards/Cards";
import Carousel from "./constructor/Carousel";
import Gallery from "./constructor/Gallery/Gallery";
import Info from "./constructor/Info/Info";
import Links from "./constructor/Links/Links";
import List from "./constructor/List/List";
import Text from "./constructor/Text/Text";
import Tabs from "./constructor/Tabs";
import StepSwitcher from "./constructor/StepSwitcher";
import PersonProfiles from "./constructor/PersonProfiles/PersonProfiles";

export { EditWidget } from "./common/EditWidget/EditWidget";
export { NavigationList } from "./common/NavigationList";
export { AdminSidebar } from "./common/AdminSidebar/AdminSidebar";
export { BreadCrumbs } from "./common/BreadCrumbs";
export { BurgerMenu } from "./common/BurgerMenu/BurgerMenu";
export { Header } from "./common/Header/Header";
export { NavigationPageContent } from "./common/NavigationPageContent";

export { Accordion, Cards, Carousel, Gallery, Info, Links, List, Text, StepSwitcher, Tabs };

export const widgetsList = [
  Cards,
  StepSwitcher,
  Carousel,
  List,
  Text,
  Links,
  Info,
  Accordion,
  Gallery,
  Tabs,
  PersonProfiles,
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
  StepSwitcherEditOptions,
  PersonProfilesEditOptions
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
