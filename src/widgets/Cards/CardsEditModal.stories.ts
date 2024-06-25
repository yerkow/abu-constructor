import type { Meta, StoryObj } from "@storybook/react";
import { CardsEditModal } from "./CardsEditModal";
const meta: Meta<typeof CardsEditModal> = {
  title: "widgets/Cards/CardsEditModal",
  component: CardsEditModal,
};
export default meta;
type Story = StoryObj<typeof CardsEditModal>;

export const Base: Story = {};
