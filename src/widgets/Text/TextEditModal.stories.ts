import type { Meta, StoryObj } from "@storybook/react";
import { TextEditModal } from "./TextEditModal";
const meta: Meta<typeof TextEditModal> = {
  title: "widgets/Text/TextEditModal",
  component: TextEditModal,
};
export default meta;
type Story = StoryObj<typeof TextEditModal>;

export const Modal: Story = {};
