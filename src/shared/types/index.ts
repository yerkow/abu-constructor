

export interface IWidgetProps {
  contents: Array<any>;
  options: any;
  locale: string;
}

export interface IContent {
  id: number;
  content: {
    [key: string]: Object;
  };
  options: {
    [key: string]: Object;
  };
  order: number
}

export interface IWidget {
  id: number;
  widget_type: string;
  options: {
    [key: string]: any;
  };
  order: number;
  contents: IContent[];
}
