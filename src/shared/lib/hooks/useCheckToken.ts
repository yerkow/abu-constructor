"use client";

import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export const useCheckToken = ({ locale }: { locale: string }) => {
  const token = getCookie("token");
  if (!token) {
    redirect(`/${locale}/admin/login`);
  } else {
    redirect(`/${locale}/admin`);
  }
};
