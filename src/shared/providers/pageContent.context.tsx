"use client";
import { createContext, ReactNode, useContext, useState } from "react";
interface Widget {
  name: string;
  order: number;
}
interface Content {
  navigationId: number;
  widgets: Widget[];
}
interface PageContentContextProps {
  content: Content | null;
  setPageId: (id: number) => void;
  setWidgets: (list: Widget[]) => void;
}
const PageContentContext = createContext<PageContentContextProps | null>(null);
interface PageContentProviderProps {
  children: ReactNode;
}
export const PageContentProvider = ({ children }: PageContentProviderProps) => {
  const [content, setContent] = useState<Content | null>(null);
  const setPageId = (id: number) => {
    setContent({ navigationId: id, widgets: content ? content.widgets : [] });
  };
  const setWidgets = (list: Widget[]) => {
    if (content) setContent({ ...content, widgets: list });
  };
  console.log(content);

  return (
    <PageContentContext.Provider value={{ content, setWidgets, setPageId }}>
      {children}
    </PageContentContext.Provider>
  );
};
export const usePageContent = () => useContext(PageContentContext);
