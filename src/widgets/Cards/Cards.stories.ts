import type { Meta, StoryObj } from "@storybook/react";
import { Cards } from "./Cards";
const meta: Meta<typeof Cards> = { title: "widgets/Cards", component: Cards };
export default meta;
type Story = StoryObj<typeof Cards>;
const mockHorizontal = new Array(6).fill({
  variant: "horizontal",
  title: "Test",
  date: "22.12.2012",
  children:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",

  src: "/vercel.svg",
});
const mockBase = new Array(6).fill({
  variant: "base",
  title: "Test",
  date: "22.12.2012",
  children:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",

  src: "/vercel.svg",
});

export const Base: Story = {
  args: {
    title: "Base title",
    variant: "base",
    items: [],
  },
};
export const Horizontal: Story = {
  args: {
    title: "Horizontal title",
    variant: "horizontal",
    items: [],
  },
};
