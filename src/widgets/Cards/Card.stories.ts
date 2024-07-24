import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
const meta: Meta<typeof Card> = {
  title: "widgets/Cards/Card",
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Base: Story = {
  args: {},
};
export const Horizontal: Story = {
  args: {},
};
