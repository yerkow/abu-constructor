import { IWidgetUpdateOrderOptions } from "../model";
import { backendUrl } from "@/shared/lib/constants";

export const fetchWidgetListByNavigationId = async (navigationId: string) => {
    const response = await fetch(`${backendUrl}/widgets/by-navigation-id/${navigationId}`);
    return response.json();
}

export const fetchWidgetOrderUpdate = async (options: IWidgetUpdateOrderOptions[]) => {
    const response = await fetch(`${backendUrl}/widgets/orders/update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });
    return response.json
}

export const fetchWidgetRemoveById = async (id: number) => {
    const response = await fetch(`${backendUrl}/widgets/${id}`, {
        method: "DELETE",
    });
    return response.json();
}