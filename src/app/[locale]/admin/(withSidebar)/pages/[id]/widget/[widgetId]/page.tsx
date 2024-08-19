import { EditWidget } from "@/widgets";
interface PageProps {
  params: { id: string; locale: string; widgetId: string };
}
export default async function Page({ params }: PageProps) {
  const { widgetId } = params;

  return <EditWidget widgetId={widgetId} />;
}
