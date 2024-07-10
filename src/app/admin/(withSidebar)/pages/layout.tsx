import { ReactNode } from "react";
export const fetchCache = "force-no-store";
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
