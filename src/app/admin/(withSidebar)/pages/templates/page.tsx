import { CreateTemplateDialog, PageEditorContent } from "@/features";
import { TemplatesListTable } from "@/widgets";

export default function TemplatesPage() {
  return (
    <section>
      <CreateTemplateDialog />
      <TemplatesListTable />
    </section>
  );
}
