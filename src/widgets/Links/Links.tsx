function Links({
  contents,
  options: { content },
  locale,
}: {
  contents: Array<any>;
  options: any;
  locale: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      {content?.[locale]?.title.toLocaleUpperCase()}
      <ul className="transition-colors duration-150 flex flex-col gap-3 ">
        {contents.map(({ content }, idx) => (
          <li
            key={idx}
            className="hover:text-[#640000] text-xl underline hover:underline-offset-2  "
          >
            <a href={content[locale].link} target="_blank">
              {content[locale].title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
Links.displayName = "Links";

export default Links;
