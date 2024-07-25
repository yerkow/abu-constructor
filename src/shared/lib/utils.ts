import { uploadFile } from "@/shared/api/widgets";
import {
  BackedPage,
  BackedWidget,
  IPage,
  PageType,
  Widget,
} from "@/shared/lib/types";
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
export const combineWidgetsByLang = (records: BackedWidget[]): Widget[] => {
  const combinedRecords: { [key: string]: Widget } = {};
  records.forEach((record) => {
    if (!combinedRecords[record.order]) {
      combinedRecords[record.order] = {
        ruId: null,
        kzId: null,
        kzOptions: null,
        ruOptions: null,
        kz_navigation_id: null,
        ru_navigation_id: null,
        order: record.order,
        widget_type: record.widget_type,
      };
    }

    if (record.language_key === "ru") {
      combinedRecords[record.order].ruOptions = record.options;
      combinedRecords[record.order].ru_navigation_id = record.navigation_id;
      combinedRecords[record.order].ruId = record.id;
    } else if (record.language_key === "kz") {
      combinedRecords[record.order].kzOptions = record.options;
      combinedRecords[record.order].kz_navigation_id = record.navigation_id;
      combinedRecords[record.order].kzId = record.id;
    }
  });

  return Object.values(combinedRecords);
};
export const combineWidgetProps = (
  ruWidgetProps: BackedWidget,
  kzWidgetProps: BackedWidget,
) => {
  return {
    ruWidgetId: ruWidgetProps.id,
    kzWidgetId: kzWidgetProps.id,
    ruOptions: JSON.parse(ruWidgetProps.options),
    kzOptions: JSON.parse(kzWidgetProps.options),
    order: ruWidgetProps.order,
    ru_navigation_id: ruWidgetProps.navigation_id,
    kz_navigation_id: kzWidgetProps.navigation_id,
  };
};
export const saveToServerAndGetUrl = async (image: File | null | string) => {
  if (typeof image == "string") {
    return image;
  }
  if (image) {
    const { file_name } = await uploadFile(image);

    return file_name;
  } else {
    return "";
  }
};

export const GetValuesByLang = (
  lang: string,
  obj: Record<string, string>,
  fields: string[],
) => {
  const newObj: Record<string, string> = {};
  const oppositeLang = lang == "Ru" ? "Kz" : "Ru";
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].endsWith(oppositeLang)) {
      continue;
    } else if (fields[i].endsWith(lang)) {
      newObj[fields[i].slice(0, -2)] = obj[fields[i]];
    } else {
      newObj[fields[i]] = obj[fields[i]];
    }
  }

  return newObj;
};

export const Mutate = () => {};
