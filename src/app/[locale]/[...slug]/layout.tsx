import { Header } from "@/widgets";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Header />
      <main className="max-w-[1200px] min-h-[calc(100svh-328px)] mx-auto flex flex-col gap-10">
        {children}
      </main>
      <footer className="w-full h-20 bg-cyan-400"></footer>
    </section>
  );
}
