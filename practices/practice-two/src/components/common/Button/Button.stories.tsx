import type { Meta, StoryObj } from '@storybook/react';
import Button, { BUTTON_VARIANT } from './index';
import React from 'react';

const meta = {
  title: 'Components/common/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button primary',
    variant: 'text',
    onClick: () => {
      alert('Button component');
    }
  }
};

export const Outline: Story = {
  args: {
    children: 'Button secondary',
    variant: BUTTON_VARIANT.OUTLINE,
    onClick: () => {
      alert('Button component');
    }
  }
};

export const Filled: Story = {
  args: {
    children: 'Button filled',
    variant: BUTTON_VARIANT.FILLED,
    color: 'danger',
    onClick: () => {
      alert('Button component');
    }
  }
};

export const FilledTonal: Story = {
  args: {
    children: 'Button filled',
    variant: BUTTON_VARIANT.FILLED_TONAL,
    color: 'danger',
    onClick: () => {
      alert('Button component');
    }
  }
};

export const ButtonWithDifferentSize: Story = {
  args: {
    variant: 'text',
    color: 'secondary',
    customClasses: 'inline-flex'
  },

  render: (args) => (
    <>
      <Button size="small" {...args}>
        Small
      </Button>
      <Button size="medium" {...args}>
        Medium
      </Button>
      <Button size="large" {...args}>
        Large
      </Button>
    </>
  )
};
