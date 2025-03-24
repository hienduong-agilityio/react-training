// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import StatusLabel from './index';

// Enum
import { COLORS } from '@/enums';

const meta: Meta<typeof StatusLabel> = {
  title: 'Components/common/StatusLabel',
  component: StatusLabel,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof StatusLabel>;

export const StatusLabelDefault: Story = {
  args: {
    children: 'IN-Process',
    color: COLORS.DANGER
  }
};

export const ShowStatusNoDot: Story = {
  args: {
    children: 'No Dot',
    color: COLORS.SUCCESS,
    showDot: false
  }
};

export const AllStatusLabel: Story = {
  render: (args) => (
    <>
      <StatusLabel {...args} color={COLORS.DEFAULT}>
        On hold
      </StatusLabel>
      <StatusLabel {...args} color={COLORS.SUCCESS}>
        On track
      </StatusLabel>
      <StatusLabel {...args} color={COLORS.DANGER}>
        At risk
      </StatusLabel>
      <StatusLabel {...args} color={COLORS.WARNING}>
        Potential risk
      </StatusLabel>
    </>
  ),
  args: {}
};
