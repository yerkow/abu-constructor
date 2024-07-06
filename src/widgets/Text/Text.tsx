interface TextProps {
  heading: string;
  content: string;
}
export const Text = ({ heading, content }: TextProps) => {
  return (
    <section className="p-4 ">
      <h2 className="text-3xl mb-2 ">{heading}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
};
