import { useDebounce } from "@/shared/lib/hooks/useDebounce"
import { fetchSearchResults } from "@/entities";
import { useQuery } from "@tanstack/react-query";
export const useSearch = (query: string, locale: string) => {
    const debouncedQuery = useDebounce(query, 1000);

    const { data, isLoading } = useQuery({
        queryFn: () => fetchSearchResults(query, locale),
        queryKey: ['search', debouncedQuery, locale],
        enabled: !!debouncedQuery
    })

    return { data, isLoading }
}