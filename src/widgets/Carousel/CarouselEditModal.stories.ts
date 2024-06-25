import type { Meta, StoryObj } from "@storybook/react";
import { CarouselEditModal } from "./CarouselEditModal";
const meta: Meta<typeof CarouselEditModal> = {
  title: "widgets/Carousel/CarouselEditModal",
  component: CarouselEditModal,
};
export default meta;
type Story = StoryObj<typeof CarouselEditModal>;

export const Base: Story = {
  args: {},
};
