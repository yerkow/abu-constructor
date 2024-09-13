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