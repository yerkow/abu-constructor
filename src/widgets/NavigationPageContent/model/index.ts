export interface IContent {
    id: number
    content: {
        [key: string]: Object
    };
    options: {
        [key: string]: Object
    }
}

export interface IWidget {
    id: number;
    widget_type: string;
    options: {
        [key: string]: any
    },
    order: number;
    contents: IContent[]
}

export interface IWidgetUpdateOrderOptions {
    id: number;
    order: number;
}

export interface IWidgetCreateOptions {
    widget_type: string,
    options?: {
        [key: string]: any
    },
    navigation_id: number
}




export interface WidgetCreateFormProps {
    title: {
        [key: string]: string
    }
}
