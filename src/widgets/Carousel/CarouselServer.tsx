import {
  CarouselClient,
  CarouselProps,
} from "@/widgets/Carousel/CarouselClient";
function Carousel(props: CarouselProps) {
  return <CarouselClient {...props} />;
}

Carousel.displayName = "Carousel";

export default Carousel;
