import { CreatePageDialog, withNoSSR } from "@/features";
import { NavigationList } from "@/widgets";
import { PagesListTable } from "@/widgets";

function PagesPage() {
  return (
    <section className="h-full">
      <CreatePageDialog />
      <NavigationList />
      {/* <PagesListTable /> */}
    </section>
  );
}
export default withNoSSR(PagesPage);
