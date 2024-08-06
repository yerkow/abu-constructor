import { GalleryProps, GalleryClient } from "@/widgets/Gallery/GalleryClient";

function Gallery(props: GalleryProps) {
  return <GalleryClient {...props} />;
}

Gallery.displayName = "Gallery";
export default Gallery;
