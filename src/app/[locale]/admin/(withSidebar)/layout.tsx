import { AdminSidebar } from "@/widgets";
import clsx from "clsx";

export default function AdminLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // const token = cookies().get("token");
  // if (!token) redirect(`/${params.locale}/admin/login`);

  return (
    <section
      className={clsx(
        "w-full h-screen grid grid-cols-1 md:grid-cols-[290px_1fr]",
      )}
    >
      <AdminSidebar />
      <main className="p-10 w-full min-h-screen overflow-auto pt-24 md:pt-10">
        {children}
      </main>
    </section>
  );
}
