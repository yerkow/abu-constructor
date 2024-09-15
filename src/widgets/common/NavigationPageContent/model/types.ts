export interface INavigationPageContent {
  params: { id: string; locale: string };
}

export interface IWidgetUpdateOrderOptions {
  id: number;
  order: number;
}

export interface IWidgetCreateOptions {
  widget_type: string;
  options?: {
    [key: string]: any;
  };
  navigation_id: number;
}

export interface WidgetCreateFormProps {
  title: {
    [key: string]: string;
  };
}
