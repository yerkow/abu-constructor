import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <nav className="w-full h-40 bg-cyan-400">Header</nav>
      <main className="max-w-[1200px] min-h-[calc(100svh-240px)] mx-auto flex flex-col gap-10">
        {children}
      </main>
      <footer className="w-full h-20 bg-cyan-400">Footer</footer>
    </section>
  );
}
