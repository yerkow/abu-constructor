import { customFetch } from "@/shared/api";


export const uploadFile = (file: File) => {
  const data = new FormData();
  data.append("file", file);
  return customFetch({
    path: "upload/",
    method: "POST",
    body: { multipart: data },
  });
};
