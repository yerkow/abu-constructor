import { INavigation } from "@/widgets/NavigationList/model/Navigation.model";
import { NavigationEditModalForm } from "../model";

export async function fetchUpdateNavigation({ id, data }: { id: number, data: NavigationEditModalForm }): Promise<INavigation> {
    const resonse = await fetch(`http://localhost:3003/navigations/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return resonse.json();

}