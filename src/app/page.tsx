import { testFetch } from "@/shared/api/pages";
import { Button } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Posts } from "./test.tsx";
export async function getPosts() {
  const posts = await testFetch();
  return posts;
}
export default async function Home() {
  const posts = await getPosts();
  return <Posts posts={posts} />;
}
