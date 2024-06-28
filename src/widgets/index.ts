import { Cards } from "./Cards/Cards";
import { CardsEditModal } from "./Cards/CardsEditModal";
import { Carousel } from "./Carousel/Carousel";
import { CarouselEditModal } from "./Carousel/CarouselEditModal";
import { List } from "./List/List";
import { ListEditModal } from "./List/ListEditModal";
import { Text } from "./Text/Text";
import { TextEditModal } from "./Text/TextEditModal";
export { AdminSidebar } from "./AdminSidebar/AdminSidebar";
export { PagesListTable } from "./PagesListTable/PagesListTable";
const widgets = [
  { widget: Cards, editModal: CardsEditModal },
  { widget: Carousel, editModal: CarouselEditModal },
  { widget: List, editModal: ListEditModal },
  { widget: Text, editModal: TextEditModal },
];

export function getEditModalByWidget(widgetName: string) {
  return widgets.filter((modal) => modal.widget.name == widgetName)[0]
    .editModal;
}

export {
  Cards,
  CardsEditModal,
  Carousel,
  CarouselEditModal,
  List,
  ListEditModal,
  Text,
  TextEditModal,
};
