"use client";
import { queryClient } from "@/shared/lib/client";
import { Button } from "@/shared/ui";
import { deleteCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const t = useTranslations("sidebar");
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        deleteCookie("token");
        router.refresh();
      }}
      className="text-black font-bold md:justify-self-center md:w-full"
    >
      {t("logout")}
    </Button>
  );
};
