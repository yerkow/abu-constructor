import { withNoSSR } from "@/features";
import { TemplateCreateModal } from "@/features/Modals/TemplateCreateModal/TemplateCreateModal";
import { TemplateList } from "@/widgets";

function TemplatesPage() {
  return (
    <section>
      <TemplateCreateModal />
      <TemplateList />
    </section>
  );
}
export default withNoSSR(TemplatesPage);
