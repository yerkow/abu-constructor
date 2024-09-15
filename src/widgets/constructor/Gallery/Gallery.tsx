import { backendImageUrl } from "@/shared/lib/constants";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/shared/ui";
import clsx from "clsx";
import Image from "next/image";

export interface GalleryProps {
  items: GalleryItem[];
}
interface GalleryItem {
  image: string;
}

function Gallery({
  contents,
  options: { content, variant, ...props },
  locale,
}: {
  contents: Array<any>;
  options: any;
  locale: string;
}) {
  const { title } = content[locale];
  return (
    <section>
      <h2 className="text-2xl font-bold">{title.toLocaleUpperCase()}</h2>
      <section className="flex flex-wrap gap-3 w-full mt-5">
        {contents.map(({ content }, idx) => (
          <Dialog key={idx}>
            <DialogTrigger
              className={clsx(
                "cursor-pointer flex-1   min-w-[300px] w-[100%] [@media(max-width:390px)]:h-[300px] h-[350px] rounded-md bg-slate-50"
              )}
              style={{
                backgroundImage: `url('${backendImageUrl}${content.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></DialogTrigger>
            <DialogContent className=" rounded-md min-w-[calc(100vw-100px)] h-auto  ">
              <DialogHeader>
                <DialogTitle className="opacity-0">Gallery modal</DialogTitle>
                <DialogDescription className="opacity-0">
                  There you can see selected image
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center">
                <div
                  className={clsx(
                    "relative w-[290px] h-[290px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px]  lg:w-[520px] lg:h-[520px]"
                  )}
                >
                  <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover rounded-md"
                    fill
                    src={`${backendImageUrl}/${content.image}`}
                    alt=""
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </section>
    </section>
  );
}
Gallery.displayName = "Gallery";
export default Gallery;
