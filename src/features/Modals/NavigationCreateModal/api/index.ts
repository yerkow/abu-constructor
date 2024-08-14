import { INavigation } from "@/widgets/NavigationList/model/Navigation.model";

export async function fetchCreateNavigationItem(data: Pick<INavigation, "slug" | "title" | "navigation_type" | "parent_id">) {
    console.log(data)
    const response = await fetch("http://localhost:3003/navigations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}