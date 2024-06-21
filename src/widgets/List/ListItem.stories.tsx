import type { Meta, StoryObj } from "@storybook/react";
import { FileArchive } from "lucide-react";
import { ListItem } from "./ListItem";
const meta: Meta<typeof ListItem> = {
  title: "widgets/List/ListItem",
  component: ListItem,
};
export default meta;
type Story = StoryObj<typeof ListItem>;

export const withoutIcon: Story = {
  args: {
    children:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    href: "www.youtube.com",
  },
};
export const withIcon: Story = {
  args: {
    children: "Name of file",

    href: "www.youtube.com",
    icon: <FileArchive />,
  },
};
