interface TextProps {
  heading: string;
  content: string;
}
function Text({
  options: { content },
  locale,
}: {
  options: { title: any; content: any };
  locale: string;
}) {
  return (
    <section className="p-4 ">
      <h2 className="text-3xl mb-2 ">{content && content[locale].title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content[locale].content }} />
    </section>
  );
}
Text.displayName = "Text";
export default Text;
