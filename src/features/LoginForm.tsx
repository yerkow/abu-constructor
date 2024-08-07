"use client";
import { Login } from "@/shared/api/login";
import { Button, Input } from "@/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { setCookie } from "cookies-next";
import { redirect, useParams, useRouter } from "next/navigation";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations("login");
  const { locale } = useParams();
  const router = useRouter();
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (data) => {
      setCookie("token", data.token);
      router.push(`/${locale}/admin`);
    },
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ username, password });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label={t("login")}
        type="text"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label={t("password")}
        type="password"
      />
      <Button disabled={isPending} loading={isPending} className="w-full">
        {t("btn")}
      </Button>
    </form>
  );
};
