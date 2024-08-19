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
