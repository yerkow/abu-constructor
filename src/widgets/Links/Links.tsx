interface LinksProps {
  title: string;
  items: { name: string; link: string }[];
}
export const Links = ({ title, items }: LinksProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl text-cyan-500 font-bold">{title}</h2>
      <ul className="flex flex-col gap-3 underline">
        {items.map((li, idx) => (
          <li key={idx} className="hover:text-cyan-500">
            <a href={li.link} target="_blank">
              {li.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
