"use client";
import { testFetch } from "@/shared/api/pages";
import { useQuery } from "@tanstack/react-query";

export const Posts = ({ posts }: { posts: any }) => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: testFetch,
    initialData: posts,
  });

  return (
    <section>
      {data.map((d: any) => (
        <h1 key={d.id}>{d.title}</h1>
      ))}
    </section>
  );
};
