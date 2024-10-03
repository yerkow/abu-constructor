import { backendUrl } from "@/shared/lib/constants";
import { normalizeSearchData } from "../lib/normalizeSearchData";

export const fetchSearchResults = async (query: string, locale: string) => {
    const response = await fetch(
        `${backendUrl}/search?query=${query}&locale=${locale}`,
        {
            cache: 'no-store'
        }
    );

    const data = await response.json();
    return normalizeSearchData(data, locale);
}