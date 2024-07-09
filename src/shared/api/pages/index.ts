export const testFetch = async () => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => data);
  return posts;
};
