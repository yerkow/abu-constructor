import { withNoSSR } from "@/features";
import { NavigationCreateModal } from "@/features";
import { NavigationList } from "@/widgets";

function PagesPage() {
  return (
    <section className="h-full">
      <NavigationCreateModal />
      <NavigationList />
    </section>
  );
}
export default withNoSSR(PagesPage);
