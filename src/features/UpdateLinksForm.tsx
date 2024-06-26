"use client";

import { Button, Input } from "@/shared/ui";

export const UpdateLinksForm = () => {
  return (
    <form className="flex flex-col gap-3 max-w-[400px]">
      <Input label="Instagram" />
      <Input label="Youtube" />
      <Input label="Facebook" />
      <Input label="VK" />
      <Input label="Телефон" />
      <Input label="Email" />
      <Button>Обновить</Button>
    </form>
  );
};
