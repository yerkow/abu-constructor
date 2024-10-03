export const normalizeSearchData = (data: any, locale: string) => {
    return data.map((item: any) => {
        if (item.type) {
            return {
                slug: item.slug,
                title: item.title[locale],
                type: item.type,
            }
        }
        return {
            slug: item.navigation.slug,
            title: item.options.content[locale].title,
            type: item.navigation.type,
        }
    })
}