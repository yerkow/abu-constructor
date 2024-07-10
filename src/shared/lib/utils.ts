import { BackedPage, IPage, PageType } from "@/shared/lib/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalize(input: string) {
  return input[0] + input.slice(1, input.length);
}

export const combinePagesByLang = (records: BackedPage[]): IPage[] => {
  const combinedRecords: { [key: string]: IPage } = {};

  records.forEach((record) => {
    if (!combinedRecords[record.slug]) {
      combinedRecords[record.slug] = {
        kzId: null,
        ruId: null,
        ru: null,
        kz: null,
        slug: record.slug,
        order: record.order,
        navigation_id: record.navigation_id,
        navigation_type: record.navigation_type as PageType,
      };
    }

    if (record.language_key === "ru") {
      combinedRecords[record.slug].ru = record.title;
      combinedRecords[record.slug].ruId = record.id;
    } else if (record.language_key === "kz") {
      combinedRecords[record.slug].kz = record.title;
      combinedRecords[record.slug].kzId = record.id;
    }
  });

  return Object.values(combinedRecords);
};
