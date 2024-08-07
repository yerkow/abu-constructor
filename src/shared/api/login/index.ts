import { customFetch } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";

export const Login = (body: {
  username: string;
  password: string;
}): Promise<{ token: string }> => {
  return customFetch({ method: "POST", path: "token/", body: { json: body } });
};
