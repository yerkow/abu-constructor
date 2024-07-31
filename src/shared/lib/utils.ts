import { uploadFile } from "@/shared/api/widgets";
import { editModalList, widgetsList } from "@/shared/lib/constants";
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

export const GetValuesByLang = async (
  lang: string,
  obj: Record<string, string>,
  fields: string[],
) => {
  const newObj: Record<string, string> = {};
  const oppositeLang = lang == "Ru" ? "Kz" : "Ru";
  for (let i = 0; i < fields.length; i++) {
    if (fields[i] == "image" || fields[i] == "file") {
      const res = await saveToServerAndGetUrl(obj[fields[i]]);
      newObj[fields[i]] = res;
      continue;
    }
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

export function deepEqual(
  obj1: Record<string, any>,
  obj2: Record<string, any>,
) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    } else {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}
export const getWidgetByName = (name: string, props: any) => {
  const widget = widgetsList.find((w, idx) => {
    return w.name === name;
  });
  if (widget) {
    return widget({ ...props });
  }
  return null;
};
export const getEditModal = (
  modal: string,
  order: number,
  ruPageId: string | null,
  kzPageId: string | null,
  queryKey: string,
  template?: boolean,
) => {
  if (ruPageId && kzPageId) {
    const baseProps = {
      order,
      ruPageId: +ruPageId,
      kzPageId: +kzPageId,
      queryKey,
    };
    const editModal = editModalList.find((m) => m.name.includes(modal));
    if (editModal) {
      const variant = template ? "dialog" : "card";
      return editModal({ variant, ...baseProps });
    }
    return null;
  }
};
