import type { Meta, StoryObj } from "@storybook/react";
import { ListEditModal } from "./ListEditModal";
const meta: Meta<typeof ListEditModal> = {
  title: "widgets/List/ListEditModal",
  component: ListEditModal,
};
export default meta;
type Story = StoryObj<typeof ListEditModal>;

export const Base: Story = {
  args: {},
};
