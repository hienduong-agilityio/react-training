import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';
import { LINK_TYPE } from '../../../types/common';

const meta = {
  title: 'Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  args: {
    href: '#',
    children: 'Underline',
    type: LINK_TYPE.UNDERLINE,
    customClasses: 'primary',
  },
};

export const NoUnderline: Story = {
  args: {
    href: '#',
    children: 'No Underline',
    type: LINK_TYPE.NONE,
    customClasses: '',
  },
};
