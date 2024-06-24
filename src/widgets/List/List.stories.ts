import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
const meta: Meta<typeof List> = {
  title: "widgets/List/List",
  component: List,
};
export default meta;
type Story = StoryObj<typeof List>;

export const Base: Story = {
  args: {
    listItems: [
      { href: "hello", content: "world" },
      { href: "hello2", content: "world2" },
      { href: "hello", content: "world" },
      { href: "hello2", content: "world2" },
    ],
  },
};

export const withIcon: Story = {
  args: {
    listItems: [
      { href: "hello", content: "1" },
      { href: "hello2", content: "2" },
      { href: "hello", content: "3" },
      { href: "hello2", content: "4" },
      { href: "hello3", content: "5" },
      { href: "hello3", content: "6" },
      { href: "hello", content: "7" },
      { href: "hello2", content: "8" },
      { href: "hello3", content: "9" },
      { href: "hello2", content: "4" },
      { href: "hello3", content: "5" },
      { href: "hello3", content: "6" },
      { href: "hello", content: "7" },
      { href: "hello2", content: "8" },
      { href: "hello3", content: "9" },
      { href: "hello2", content: "4" },
      { href: "hello3", content: "5" },
      { href: "hello3", content: "6" },
      { href: "hello", content: "7" },
      { href: "hello2", content: "8" },
      { href: "hello3", content: "9" },
      { href: "hello2", content: "4" },
      { href: "hello3", content: "5" },
      { href: "hello3", content: "6" },
      { href: "hello", content: "7" },
      { href: "hello2", content: "8" },
      { href: "hello3", content: "9" },
      { href: "hello2", content: "4" },
      { href: "hello3", content: "5" },
      { href: "hello3", content: "6" },
      { href: "hello", content: "7" },
      { href: "hello2", content: "8" },
      { href: "hello3", content: "9" },
      { href: "hello2", content: "4" },
      { href: "hello3", content: "5" },
      { href: "hello3", content: "6" },
      { href: "hello", content: "7" },
      { href: "hello2", content: "8" },
      { href: "hello3", content: "9" },
      { href: "hello2", content: "4" },
      { href: "hello3", content: "5" },
      { href: "hello3", content: "6" },
      { href: "hello", content: "7" },
      { href: "hello2", content: "8" },
      { href: "hello3", content: "9" },
    ],
    files: true,
  },
};
