// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import Tag from './index';

// Enum
import { COLORS } from '@/enums/theme';

const meta = {
  title: 'Components/common/Tag',
  component: Tag,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TagDefault: Story = {
  args: {
    children: 'default',
    color: COLORS.DEFAULT
  }
};

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Tag {...args} children='Default' color={COLORS.DEFAULT} />
      <Tag {...args} children='Primary' color={COLORS.PRIMARY} />
      <Tag {...args} children='Success' color={COLORS.SUCCESS} />
      <Tag {...args} children='Warning' color={COLORS.WARNING} />
      <Tag {...args} children='Danger' color={COLORS.DANGER} />
    </div>
  ),
  args: {
    children: '',
    color: COLORS.DEFAULT,
    onClick: () => {
      alert('Tag component');
    }
  }
};
