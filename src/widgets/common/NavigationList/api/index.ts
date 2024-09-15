import { backendUrl } from "@/shared/lib/constants";
import { INavListUpdateOrderOptions } from "../model/types";

export const fetchUpdateOrderNavigationList = async (
  options: INavListUpdateOrderOptions[]
) => {
  const response = await fetch(`${backendUrl}/navigations/orders/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  return response.json;
};
