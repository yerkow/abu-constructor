import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";
const meta: Meta<typeof Carousel> = {
  title: "widgets/Carousel/Carousel",
  component: Carousel,
};
export default meta;
type Story = StoryObj<typeof Carousel>;
const mock = new Array(9).fill({
  img: "/123.jpg",
  title: "Title",
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
});
export const TextLeft: Story = {
  args: {
    position: "left",
    items: mock,
  },
};
export const TextCenter: Story = {
  args: {
    position: "center",
    items: mock,
  },
};
export const TextRight: Story = {
  args: {
    position: "right",
    items: mock,
  },
};
