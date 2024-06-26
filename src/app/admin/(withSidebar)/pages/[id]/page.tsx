export default function Page({ params }: { params: { id: number } }) {
  return <div>page {params.id}</div>;
}
