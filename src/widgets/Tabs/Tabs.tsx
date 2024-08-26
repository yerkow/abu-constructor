import { backendImageUrl } from "@/shared/lib/constants";
import Image from "next/image";
import React from "react";

function Tabs({ contents, locale }: { contents: any; locale: string }) {
  console.log(contents[0].content.icon)

  return (
    <ul className="flex flex-wrap gap-5">
      {contents?.map((tab: any, idx: number) => (
        <li className="flex-grow flex min-w-[260px] gap-4 p-6 bg-[#640000] text-white rounded-md cursor-pointer justify-between align-center">
          <h2>{tab.content[locale].title}</h2>
          <Image
            src={backendImageUrl + tab?.content?.icon}
            alt="icon"
            width={50}
            height={50}
          />
        </li>
      ))}
    </ul>
  );
}

Tabs.displayName = "Tabs";
export default Tabs;
