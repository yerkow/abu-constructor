import { PageContentProvider } from "@/shared/providers";

export default function Layout({ children }) {
  return <PageContentProvider>{children}</PageContentProvider>;
}
