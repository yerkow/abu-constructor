export interface Content {
  id: number;
  content: {
    [key: string]: any;
  };
  options: {
    [key: string]: any;
  };
  widget_id: number;
}

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
