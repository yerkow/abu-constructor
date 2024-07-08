"use client";

import { useSearchParams } from "next/navigation";
import { title } from "process";
import { ChangeEvent } from "react";

export const useSaveToLocalStorage = () => {
  const edittingPageId = useSearchParams().get("editting");

  const saveToLocalStorage = (res: any, order: number) => {
    if (edittingPageId) {
      res = { ...res, navigation_id: edittingPageId };
      let pagesContent: any = localStorage.getItem(edittingPageId);
      if (pagesContent) {
        pagesContent = JSON.parse(pagesContent);
        if (Array.isArray(pagesContent)) {
          if (pagesContent.findIndex((page) => page.order === order) == -1) {
            pagesContent.push(res);
          } else {
            pagesContent = pagesContent.map((widget) => {
              if (widget.order === order) {
                return res;
              } else {
                return widget;
              }
            });
          }

          localStorage.setItem(edittingPageId, JSON.stringify(pagesContent));
        }
      } else {
        localStorage.setItem(edittingPageId, JSON.stringify([res]));
      }
    }
  };
  return { saveToLocalStorage };
};
