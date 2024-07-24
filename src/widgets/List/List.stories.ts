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
    items: [
      { file: "hello", content: "world" },
      { file: "hello2", content: "world2" },
      { file: "hello", content: "world" },
      { file: "hello2", content: "world2" },
    ],
  },
};

export const withIcon: Story = {
  args: {
    items: [
      { file: "hello", content: "1" },
      { file: "hello2", content: "2" },
      { file: "hello", content: "3" },
      { file: "hello2", content: "4" },
      { file: "hello3", content: "5" },
      { file: "hello3", content: "6" },
      { file: "hello", content: "7" },
      { file: "hello2", content: "8" },
      { file: "hello3", content: "9" },
      { file: "hello2", content: "4" },
      { file: "hello3", content: "5" },
      { file: "hello3", content: "6" },
      { file: "hello", content: "7" },
      { file: "hello2", content: "8" },
      { file: "hello3", content: "9" },
      { file: "hello2", content: "4" },
      { file: "hello3", content: "5" },
      { file: "hello3", content: "6" },
      { file: "hello", content: "7" },
      { file: "hello2", content: "8" },
      { file: "hello3", content: "9" },
      { file: "hello2", content: "4" },
      { file: "hello3", content: "5" },
      { file: "hello3", content: "6" },
      { file: "hello", content: "7" },
      { file: "hello2", content: "8" },
      { file: "hello3", content: "9" },
      { file: "hello2", content: "4" },
      { file: "hello3", content: "5" },
      { file: "hello3", content: "6" },
      { file: "hello", content: "7" },
      { file: "hello2", content: "8" },
      { file: "hello3", content: "9" },
      { file: "hello2", content: "4" },
      { file: "hello3", content: "5" },
      { file: "hello3", content: "6" },
      { file: "hello", content: "7" },
      { file: "hello2", content: "8" },
      { file: "hello3", content: "9" },
      { file: "hello2", content: "4" },
      { file: "hello3", content: "5" },
      { file: "hello3", content: "6" },
      { file: "hello", content: "7" },
      { file: "hello2", content: "8" },
      { file: "hello3", content: "9" },
    ],
  },
};
