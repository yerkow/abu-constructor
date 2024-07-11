import { customFetch } from "@/shared/api";
import { Widget } from "@/shared/lib/types";

export const createWidget = (widget: Omit<Widget, "id">) => {
  return customFetch({ path: "", method: "POST", body: { json: widget } });
};
