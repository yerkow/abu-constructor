import { List } from "lucide-react";
import { Cards } from "./Cards/Cards";
import { CardsEditModal } from "./Cards/CardsEditModal";
import { Carousel } from "./Carousel/Carousel";
import { CarouselEditModal } from "./Carousel/CarouselEditModal";
import { ListEditModal } from "./List/ListEditModal";
import { TextEditModal } from "./Text/TextEditModal";

const widgets = [
  { widget: Cards, editModal: CardsEditModal },
  { widget: Carousel, editModal: CarouselEditModal },
  { widget: List, editModal: ListEditModal },
  { widget: Text, editModal: TextEditModal },
];

export function getEditModalByWidget(
  widgetName: string
): () => JSX.Element | null {
  switch (widgetName) {
    case "Cards":
      return CardsEditModal;
    case "Carousel":
      return CarouselEditModal;
    case "List":
      return ListEditModal;
    case "Text":
      return TextEditModal;
    default:
      return () => null;
  }
}
