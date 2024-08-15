export interface INavigation {
    id: number;
    title: {
        [key: string]: string;
    };
    slug: string;
    navigation_type: string;
    order: number;
    parent_id: null | number;
    children: INavigation[];
    createdAt: string;
    updatedAt: string;
}

export interface INavListUpdateOrderOptions {
    id: number;
    order: number;
    parent_id?: number | null;
}