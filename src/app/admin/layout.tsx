import { AdminSidebar } from "@/widgets";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full h-screen grid grid-cols-[350px_1fr]">
      <AdminSidebar />
      <main>{children}</main>
    </section>
  );
}
