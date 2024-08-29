import { NavigationPageContent } from "@/widgets";

interface PageProps {
  params: { id: string; locale: string };
}
export default async function Page({ params }: PageProps) {
  return (
    <section>
      <NavigationPageContent params={params} />
    </section>
  );
}
