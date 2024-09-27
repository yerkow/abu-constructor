
import { IWidgetProps } from '@/shared/types';
import { CarouselClient } from './CarouselClient';

function Carousel(props: IWidgetProps) {
  return <CarouselClient {...props} />
}

Carousel.displayName = "Carousel";
export default Carousel;
