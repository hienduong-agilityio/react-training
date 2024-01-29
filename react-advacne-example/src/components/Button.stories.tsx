import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { BUTTON_VARIANT } from "../constants/common";

const meta = {
  title: "Components/common/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button primary",
    variant: BUTTON_VARIANT.TEXT,
    onClick: () => {
      alert("Button component");
    },
  },
};

export const Outline: Story = {
  args: {
    children: "Button secondary",
    variant: BUTTON_VARIANT.OUTLINE,
    onClick: () => {
      alert("Button component");
    },
  },
};

export const Filled: Story = {
  args: {
    children: "Button outline",
    variant: BUTTON_VARIANT.FILLED,
    onClick: () => {
      alert("Button component");
    },
  },
};
