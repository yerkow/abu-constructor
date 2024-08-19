import { CreateTemplateDialog,withNoSSR } from "@/features";
import { TemplatesListTable } from "@/widgets";

function TemplatesPage() {
  return (
    <section>
      <CreateTemplateDialog />
      <TemplatesListTable />
    </section>
  );
}
export default withNoSSR(TemplatesPage);
