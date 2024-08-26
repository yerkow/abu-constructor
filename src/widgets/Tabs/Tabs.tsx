import React from "react";

function Tabs({ contents, locale }: { contents: any; locale: string }) {
  return (
    <ul className="flex flex-wrap gap-5">
      {contents?.map((tab: any, idx: number) => (
        <li className="flex-grow flex min-w-[500px] p-6 bg-[#640000] text-white rounded-md cursor-pointer">
          {tab.content[locale].title}
        </li>
      ))}
    </ul>
  );
}

Tabs.displayName = "Tabs";
export default Tabs;
