import { backendUrl } from "@/shared/lib/constants";
import { ITemplate } from "../model";

export const fetchCreateTemplate = async (data: ITemplate): Promise<ITemplate> => {

    const response = await fetch(`http://localhost:3003/api/template`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to create template');
    }

    return response.json();
}