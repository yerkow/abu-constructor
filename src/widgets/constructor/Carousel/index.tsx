import React from "react";
import { CarouselClient } from "./Carousel";

function Carousel(props: any) {
  return <CarouselClient {...props} />;
}

Carousel.displayName = "Carousel";
export default Carousel;
